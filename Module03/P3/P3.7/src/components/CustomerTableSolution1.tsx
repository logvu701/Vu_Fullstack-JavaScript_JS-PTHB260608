import React from 'react';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import type { CustomerData } from '../types/customer';

interface CustomerTableSolution1Props {
  data?: CustomerData;
  isLoading: boolean;
  isFetching: boolean;
}

/**
 * GIẢI PHÁP 1 (LỖI TRẢI NGHIỆM NGƯỜI DÙNG - BAD UX):
 * Dùng chung một màn hình loading / Fullscreen Spinner cho MỌI trạng thái tải (kể cả tải ngầm isFetching).
 * Hậu quả: Đang xem bảng hoặc cuộn chuột, cứ có background refetch là màn hình lại bị che trắng tinh,
 * làm đứt gãy hoàn toàn thao tác của nhân viên!
 */
export const CustomerTableSolution1: React.FC<CustomerTableSolution1Props> = ({
  data,
  isLoading,
  isFetching,
}) => {
  // LỖI: Dùng chung isFetching để che toàn màn hình
  const shouldBlockScreen = isLoading || isFetching;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-4 relative">
      {/* Banner Warning Bad UX */}
      <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-2xl flex items-start gap-3 text-xs text-rose-300">
        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Giải pháp 1: Hard Loading cho mọi trạng thái (Bad UX)</strong>
          <span>
            Khi bạn bấm "Kích hoạt Refetch ngầm", màn hình sẽ bị che kín bởi Spinner to đùng, gây giật màn hình và cản trở người dùng thao tác.
          </span>
        </div>
      </div>

      {/* Block Screen Modal / Spinner Overlay */}
      {shouldBlockScreen && (
        <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 space-y-3 min-h-[300px]">
          <div className="w-12 h-12 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-bold text-white">Đang tải dữ liệu... (Màn hình bị khóa cứng)</div>
          <p className="text-xs text-rose-300">
            {isFetching && !isLoading ? '⚠️ Lỗi UX: Đang Refetch ngầm nhưng lại chặn toàn bộ UI!' : 'Đang tải lần đầu'}
          </p>
        </div>
      )}

      {/* Table Content */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">Danh sách Khách hàng Doanh nghiệp</h3>
          <span className="text-xs text-slate-400">Cập nhật: {data?.lastUpdated}</span>
        </div>

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
                  <td className="p-4 font-mono font-bold text-indigo-400">{c.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-[11px] text-slate-500">{c.email} • {c.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
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
      </div>
    </div>
  );
};
