import React, { memo } from 'react';
import { Search, Filter, ArrowUpDown, Sliders, Sparkles } from 'lucide-react';
import type { Department, FilterConfig } from '../types/student';

interface FilterToolbarProps {
  filters: FilterConfig;
  onFilterChange: (updates: Partial<FilterConfig>) => void;
}

const DEPARTMENTS: Department[] = [
  'All',
  'Frontend Engineering',
  'Backend Microservices',
  'Cloud DevOps',
  'Mobile React Native',
  'Data AI',
];

/**
 * FilterToolbar được bao bọc bởi React.memo để ngăn chặn re-render khi các state không liên quan thay đổi
 */
export const FilterToolbar: React.FC<FilterToolbarProps> = memo(({ filters, onFilterChange }) => {
  return (
    <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-md space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Tìm kiếm Học viên:
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Tìm theo tên, mã (RK-00001), email, khoa..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Department Select */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Khoa Chuyên ngành:
          </label>
          <select
            value={filters.selectedDepartment}
            onChange={(e) => onFilterChange({ selectedDepartment: e.target.value as Department })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'Tất cả các Khoa' : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            Sắp xếp:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterConfig['sortBy'] })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
          >
            <option value="name-asc">Tên (A-Z)</option>
            <option value="gpa-desc">GPA: Cao đến Thấp</option>
            <option value="gpa-asc">GPA: Thấp đến Cao</option>
            <option value="attendance-desc">Chuyên cần cao nhất</option>
          </select>
        </div>

        {/* Min GPA Slider */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Min GPA:
            </label>
            <span className="text-xs font-bold text-cyan-400 font-mono">{filters.minGPA.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="2.0"
            max="4.0"
            step="0.1"
            value={filters.minGPA}
            onChange={(e) => onFilterChange({ minGPA: parseFloat(e.target.value) })}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
});
