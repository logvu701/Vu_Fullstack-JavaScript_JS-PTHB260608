import React from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import type { InventoryCategory } from '../types/inventory';
import { Search, Filter, X, Layers } from 'lucide-react';

const CATEGORIES: { id: InventoryCategory; label: string }[] = [
  { id: 'All', label: 'Tất Cả Danh Mục' },
  { id: 'Electronics', label: 'Điện Tử & Công Nghệ' },
  { id: 'Apparel', label: 'Thời Trang & May Mặc' },
  { id: 'Food', label: 'Thực Phẩm & Đồ Uống' },
  { id: 'Office', label: 'Nội Thất & Văn Phòng' },
];

export const InventoryFilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, resetFilters } =
    useInventoryStore();

  const hasActiveFilters = searchQuery !== '' || categoryFilter !== 'All';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo Tên sản phẩm, Mã SKU hoặc Vị trí kho (vd: A-02)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Xóa Bộ Lọc</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1 shrink-0 mr-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Nhóm hàng:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = categoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700 shadow-sm shadow-cyan-900/30'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
