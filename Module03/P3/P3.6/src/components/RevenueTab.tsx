import React from 'react';
import { DollarSign, TrendingUp, Target, Calendar, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';
import type { RevenueData } from '../types/dashboard';

interface RevenueTabProps {
  data?: RevenueData;
  isLoading: boolean;
  isFetching: boolean;
  onForceRefresh: () => void;
}

export const RevenueTab: React.FC<RevenueTabProps> = ({
  data,
  isLoading,
  isFetching,
  onForceRefresh,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="p-16 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Đang tải Thống kê Doanh thu lần đầu...</h3>
          <p className="text-xs text-slate-400">Độ trễ API mô phỏng: 2.0s</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Force Refresh Button (BẪY DỮ LIỆU) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Báo cáo Doanh Thu Doanh Nghiệp</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
              Fresh Cache (5m)
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Dữ liệu được lưu trong bộ nhớ đệm 5 phút. Khi chuyển tab sang Nhân sự và quay lại, trang mở <strong>ngay lập tức 0ms</strong>.
          </p>
        </div>

        {/* NÚT LÀM MỚI DỮ LIỆU (FORCE REFRESH) */}
        <button
          onClick={onForceRefresh}
          disabled={isFetching}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 shrink-0"
          title="Bỏ qua staleTime và ép gọi API ngay lập tức"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          <span>{isFetching ? 'Đang gọi lại API...' : 'Làm mới Dữ liệu (Force Refresh)'}</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tổng Doanh Thu Lũy Kế</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {formatCurrency(data?.totalRevenue || 0)}
          </div>
          <span className="text-[11px] text-slate-500">Cập nhật lúc: {data?.lastUpdated}</span>
        </div>

        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Đạt Mục Tiêu Quý</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400">
            {data?.targetAchieved}%
          </div>
          <span className="text-[11px] text-slate-500">Mục tiêu: 3.0 Tỷ VNĐ</span>
        </div>

        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tăng Trưởng Hàng Năm</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            +{data?.annualGrowth}%
          </div>
          <span className="text-[11px] text-slate-500">So với cùng kỳ năm 2025</span>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Chi tiết Doanh số theo Tháng</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <th className="p-4">Tháng</th>
                <th className="p-4">Doanh Thu Đạt Được</th>
                <th className="p-4">Chỉ Tiêu Đặt Ra</th>
                <th className="p-4">Tỷ Lệ Tăng Trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data?.monthlyStats.map((item) => (
                <tr key={item.month} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-white">{item.month}</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">{formatCurrency(item.revenue)}</td>
                  <td className="p-4 font-mono text-slate-400">{formatCurrency(item.target)}</td>
                  <td className="p-4 font-mono font-bold text-cyan-400">+{item.growthPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
