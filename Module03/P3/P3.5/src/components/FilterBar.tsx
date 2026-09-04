import React from 'react';
import { Search, RotateCcw, Filter, Tag, DollarSign, Sparkles } from 'lucide-react';
import { useFilterStore } from '../store/useFilterStore';
import type { OrderStatus } from '../types/order';

const STATUS_LIST: { key: OrderStatus; label: string; color: string }[] = [
  { key: 'All', label: 'Tất cả đơn', color: 'bg-slate-700 text-white' },
  { key: 'Pending', label: 'Chờ xử lý (Pending)', color: 'bg-amber-600 text-white' },
  { key: 'Shipped', label: 'Đang giao (Shipped)', color: 'bg-blue-600 text-white' },
  { key: 'Delivered', label: 'Đã giao (Delivered)', color: 'bg-emerald-600 text-white' },
];

export const FilterBar: React.FC = () => {
  // Đọc và dispatch trực tiếp từ Zustand Client Store
  const { status, searchQuery, minAmount, setStatus, setSearchQuery, setMinAmount, resetFilters } =
    useFilterStore();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Gọi action setSearchQuery (nơi đã có bẫy dữ liệu .trim() an toàn)
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
      {/* Top row: Status Tabs & Reset button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            Trạng thái:
          </span>
          {STATUS_LIST.map((item) => (
            <button
              key={item.key}
              onClick={() => setStatus(item.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                status === item.key
                  ? `${item.color} ring-2 ring-cyan-400/50 shadow-md`
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-semibold transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>

      {/* Middle row: Search Input & Min Amount Slider */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-800/80">
        {/* Search */}
        <div className="md:col-span-8 relative">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Tìm kiếm Đơn hàng (Tự động .trim() ở Zustand):
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Tìm theo tên khách, email, mã đơn (ORD-8921), tên khóa học..."
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Min Amount Slider */}
        <div className="md:col-span-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              Giá tối thiểu:
            </label>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minAmount)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4000000"
            step="500000"
            value={minAmount}
            onChange={(e) => setMinAmount(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Live QueryKey Inspector Widget */}
      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
          <span className="text-emerald-400 font-bold">TanStack QueryKey:</span>
          <span className="text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            {JSON.stringify(['orders', { status, search: searchQuery, minAmount }])}
          </span>
        </div>
        <span className="text-[11px] text-cyan-400 font-sans">
          ⚡ Tự động Re-fetch khi Key thay đổi (No useEffect needed!)
        </span>
      </div>
    </div>
  );
};
