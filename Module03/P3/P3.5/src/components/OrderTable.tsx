import React from 'react';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, RefreshCw } from 'lucide-react';
import type { Order } from '../types/order';

interface OrderTableProps {
  orders: Order[];
  isLoading: boolean;
  isFetching: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, isLoading, isFetching }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Đang tải dữ liệu từ Server State qua TanStack Query...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden space-y-4">
      <div className="p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">Danh sách Đơn hàng</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[11px] font-bold border border-cyan-800">
            {orders.length} kết quả
          </span>
        </div>

        {isFetching && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Đang đồng bộ ngầm...</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 text-xs font-bold border-b border-slate-800">
              <th className="p-4">Mã Đơn</th>
              <th className="p-4">Khách Hàng</th>
              <th className="p-4">Sản Phẩm</th>
              <th className="p-4">Tổng Tiền</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4">Thời Gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                let statusBadge = 'bg-amber-950 text-amber-300 border-amber-800';
                let StatusIcon = Clock;

                if (order.status === 'Shipped') {
                  statusBadge = 'bg-blue-950 text-blue-300 border-blue-800';
                  StatusIcon = Truck;
                } else if (order.status === 'Delivered') {
                  statusBadge = 'bg-emerald-950 text-emerald-300 border-emerald-800';
                  StatusIcon = CheckCircle2;
                }

                return (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-400">{order.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.email}</div>
                    </td>
                    <td className="p-4 text-slate-200">{order.product}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">{order.createdAt}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
