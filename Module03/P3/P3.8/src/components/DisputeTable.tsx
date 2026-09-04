import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDisputes,
  updateDisputeStatusApi,
} from '../api/disputeApi';
import type { DisputeOrder, DisputeLog, DisputeStatus } from '../types/dispute';
import {
  CheckCircle2,
  AlertOctagon,
  Clock,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface DisputeTableProps {
  isOptimisticMode: boolean;
  shouldSimulateError: boolean;
  onAddLog: (log: DisputeLog) => void;
  onSetToast: (toast: { type: 'success' | 'error'; message: string } | null) => void;
}

export const DisputeTable: React.FC<DisputeTableProps> = ({
  isOptimisticMode,
  shouldSimulateError,
  onAddLog,
  onSetToast,
}) => {
  const queryClient = useQueryClient();
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  // Fetch disputes
  const { data: disputes = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ['disputes'],
    queryFn: fetchDisputes,
  });

  // 1. OPTIMISTIC MUTATION
  const optimisticMutation = useMutation({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      onAddLog({
        id: Math.random().toString(),
        orderId,
        action: 'API_DISPATCH',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'optimistic',
        detail: `[API Dispatch]: Gửi HTTP PUT /api/disputes/${orderId}/resolve tới máy chủ (độ trễ 2000ms)...`,
      });
      return updateDisputeStatusApi(orderId, 'Resolved', shouldSimulateError);
    },
    onMutate: async ({ orderId }) => {
      onAddLog({
        id: Math.random().toString(),
        orderId,
        action: 'ON_MUTATE (t=0.0s)',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'optimistic',
        detail: `[t = 0.000s Instant Update]: cancelQueries() + backup previousDisputes + setQueryData() đổi ngay sang 'Resolved'!`,
      });

      // Huỷ các queries trùng lặp
      await queryClient.cancelQueries({ queryKey: ['disputes'] });

      // Lưu snapshot dữ liệu cũ
      const previousDisputes = queryClient.getQueryData<DisputeOrder[]>(['disputes']);

      // Cập nhật Cache tức thì tại t=0s
      queryClient.setQueryData<DisputeOrder[]>(['disputes'], (old = []) =>
        old.map((item) =>
          item.id === orderId
            ? { ...item, status: 'Resolved' as DisputeStatus, updatedAt: 'Vừa xong (Optimistic t=0s)' }
            : item
        )
      );

      onSetToast({
        type: 'success',
        message: `⚡ [Optimistic t=0.0s] Đơn #${orderId} đã chuyển sang "Đã xử lý"! Đang đồng bộ máy chủ...`,
      });

      return { previousDisputes, orderId };
    },
    onError: (err, variables, context) => {
      onAddLog({
        id: Math.random().toString(),
        orderId: variables.orderId,
        action: 'ON_ERROR (Rollback)',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'rollback',
        detail: `[t = 2.000s Rollback]: Máy chủ từ chối cập nhật! Khôi phục Cache về bản Snapshot cũ (status = 'Violation').`,
      });

      // Rollback về snapshot cũ
      if (context?.previousDisputes) {
        queryClient.setQueryData(['disputes'], context.previousDisputes);
      }

      onSetToast({
        type: 'error',
        message: (err as Error).message || 'Lỗi cập nhật server 500!',
      });
    },
    onSettled: (_data, _error, variables) => {
      onAddLog({
        id: Math.random().toString(),
        orderId: variables.orderId,
        action: 'ON_SETTLED (Sync)',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'success',
        detail: `[t = 2.000s Settled]: Luôn invalidateQueries(['disputes']) để đảm bảo client đồng bộ 100% với database.`,
      });

      queryClient.invalidateQueries({ queryKey: ['disputes'] });
    },
  });

  // 2. PESSIMISTIC MUTATION (Traditional)
  const pessimisticMutation = useMutation({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      setLoadingOrderId(orderId);
      onAddLog({
        id: Math.random().toString(),
        orderId,
        action: 'PESSIMISTIC_WAIT',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'optimistic',
        detail: `[Pessimistic Mode]: Đang chặn UI, quay Spinner suốt 2.0s chờ Server phản hồi trước khi đổi trạng thái...`,
      });
      return updateDisputeStatusApi(orderId, 'Resolved', shouldSimulateError);
    },
    onSuccess: (data, variables) => {
      onAddLog({
        id: Math.random().toString(),
        orderId: variables.orderId,
        action: 'PESSIMISTIC_SUCCESS',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'success',
        detail: `[t = 2.000s Thành công]: Server phản hồi thành công, bây giờ UI mới chuyển sang màu xanh 'Resolved'.`,
      });
      queryClient.setQueryData<DisputeOrder[]>(['disputes'], (old = []) =>
        old.map((item) => (item.id === variables.orderId ? data : item))
      );
      onSetToast({
        type: 'success',
        message: `Đơn #${variables.orderId} đã được server cập nhật thành công sau 2.0s.`,
      });
    },
    onError: (err, variables) => {
      onAddLog({
        id: Math.random().toString(),
        orderId: variables.orderId,
        action: 'PESSIMISTIC_ERROR',
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        status: 'rollback',
        detail: `[t = 2.000s Thất bại]: Server báo lỗi 500, UI giữ nguyên trạng thái cũ.`,
      });
      onSetToast({
        type: 'error',
        message: (err as Error).message || 'Server lỗi 500!',
      });
    },
    onSettled: () => {
      setLoadingOrderId(null);
      queryClient.invalidateQueries({ queryKey: ['disputes'] });
    },
  });

  const handleResolve = (orderId: string) => {
    if (isOptimisticMode) {
      optimisticMutation.mutate({ orderId });
    } else {
      pessimisticMutation.mutate({ orderId });
    }
  };

  const isMutatingCurrent = (orderId: string) => {
    if (isOptimisticMode) {
      return optimisticMutation.isPending && optimisticMutation.variables?.orderId === orderId;
    }
    return loadingOrderId === orderId;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100">Danh Sách Đơn Hàng Cần Xử Lý Khiếu Nại</h2>
            {isFetching && !isLoading && (
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-medium animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                Đang đồng bộ Cache...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Thử nghiệm bấm nút <strong className="text-emerald-400">"Đánh dấu Đã xử lý"</strong> để quan sát sự khác biệt giữa phản hồi tức thì t=0.0s và chờ 2s.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Làm mới bảng</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Đang tải danh sách khiếu nại...</p>
        </div>
      ) : disputes.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500/50 mb-2" />
          <p>Không có đơn hàng nào vi phạm!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 font-medium border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Mã Đơn</th>
                <th className="py-3 px-4">Khách Hàng</th>
                <th className="py-3 px-4">Giá Trị</th>
                <th className="py-3 px-4">Lý Do Vi Phạm</th>
                <th className="py-3 px-4">Trạng Thái</th>
                <th className="py-3 px-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {disputes.map((item) => {
                const isPending = isMutatingCurrent(item.id);
                const isResolved = item.status === 'Resolved';

                return (
                  <tr
                    key={item.id}
                    className={`transition duration-300 ${
                      isResolved
                        ? 'bg-emerald-950/20 hover:bg-emerald-950/30'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {item.orderCode}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {item.customerName}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-amber-400">
                      {item.amount.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <span className="flex items-center gap-1.5 text-rose-300 text-xs">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        {item.violationType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm shadow-emerald-900/30 animate-in fade-in duration-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Đã xử lý (Resolved)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                          Vi phạm (Violation)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isResolved ? (
                        <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400/80 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{item.updatedAt}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleResolve(item.id)}
                          disabled={isPending}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-md ${
                            isPending
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                              : isOptimisticMode
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
                          }`}
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Đang gửi API...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5" />
                              <span>Đánh dấu Đã xử lý</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
