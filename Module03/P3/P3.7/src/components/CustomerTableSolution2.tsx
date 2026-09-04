import React from 'react';
import { CheckCircle2, RefreshCw, Zap, Sparkles } from 'lucide-react';
import type { CustomerData } from '../types/customer';

interface CustomerTableSolution2Props {
  data?: CustomerData;
  isLoading: boolean;
  isFetching: boolean;
}

/**
 * GIẢI PHÁP 2 (CHUẨN TRẢI NGHIỆM NGƯỜI DÙNG - OPTIMAL UX):
 * - Khi tải lần đầu (isLoading = true): Dùng Skeleton Loading thể hiện khung bảng dữ liệu (Hard Loading).
 * - Khi tải ngầm (isFetching = true && !isLoading): Bảng dữ liệu VẪN TƯƠNG TÁC BÌNH THƯỜNG,
 *   chỉ hiển thị một đường Line Pulse mượt mà trên nóc bảng và chấm tròn quay nhỏ ở góc (Soft Loading).
 */
export const CustomerTableSolution2: React.FC<CustomerTableSolution2Props> = ({
  data,
  isLoading,
  isFetching,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Banner Optimal UX */}
      <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-2xl flex items-start justify-between gap-3 text-xs text-emerald-300">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">
              Giải pháp 2: Tách biệt Skeleton (`isLoading`) & Soft Indicator (`isFetching`)
            </strong>
            <span>
              Bấm "Kích hoạt Refetch ngầm": Bảng dữ liệu vẫn hoạt động mượt mà 100%, không bị chớp giật màn hình!
            </span>
          </div>
        </div>

        {isFetching && !isLoading && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-[11px] font-bold border border-emerald-700 shrink-0 animate-pulse">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Đang làm mới ngầm...</span>
          </span>
        )}
      </div>

      {/* Main Table or Skeleton */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden relative">
        {/* Soft Loading Progress Bar on Top when isFetching */}
        {isFetching && !isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 animate-pulse z-10" />
        )}

        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">Danh sách Khách hàng Doanh nghiệp</h3>
          <span className="text-xs text-slate-400">
            {isLoading ? 'Đang chuẩn bị...' : `Cập nhật lúc: ${data?.lastUpdated}`}
          </span>
        </div>

        {/* 1. KHI IS_LOADING: HIỂN THỊ SKELETON LOADING (HARD LOADING LẦN ĐẦU) */}
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-slate-800/60">
                <div className="h-4 bg-slate-800 rounded w-20" />
                <div className="h-4 bg-slate-800 rounded w-48" />
                <div className="h-4 bg-slate-800 rounded w-24" />
                <div className="h-4 bg-slate-800 rounded w-32" />
                <div className="h-4 bg-slate-800 rounded w-28" />
              </div>
            ))}
          </div>
        ) : (
          /* 2. KHI ĐÃ CÓ DATA: HIỂN THỊ BẢNG HOÀN CHỈNH, TƯƠNG TÁC LIÊN TỤC */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                  <th className="p-4">Mã KH</th>
                  <th className="p-4">Doanh Nghiệp</th>
                  <th className="p-4">Gói Dịch Vụ</th>
                  <th className="p-4">Doanh Thu</th>
                  <th className="p-4">Hoạt Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {data?.customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono font-bold text-emerald-400">{c.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.email} • {c.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                        {c.plan}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400">{formatCurrency(c.totalSpent)}</td>
                    <td className="p-4 text-slate-400">{c.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
