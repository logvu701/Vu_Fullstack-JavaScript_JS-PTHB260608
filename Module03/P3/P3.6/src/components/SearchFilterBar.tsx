import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Filter, RotateCcw, ArrowUpDown, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import type { CourseCategory, CourseLevel, SortOption } from '../types/course';

interface SearchFilterBarProps {
  totalResults: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ totalResults }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Đọc trạng thái khởi tạo trực tiếp từ URL query parameters (Khôi phục khi tải lại trang)
  const queryFromUrl = searchParams.get('q') || '';
  const categoryFromUrl = (searchParams.get('category') as CourseCategory) || 'all';
  const levelFromUrl = (searchParams.get('level') as CourseLevel) || 'all';
  const sortFromUrl = (searchParams.get('sort') as SortOption) || 'relevance';

  // Local state cho ô tìm kiếm để người dùng gõ mượt mà
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  // Khi URL thay đổi từ bên ngoài (ví dụ user bấm nút Back/Forward trình duyệt hoặc paste URL mới), đồng bộ lại local state
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  /**
   * Helper cập nhật searchParams an toàn và loại bỏ các param rác (Bẫy dữ liệu)
   */
  const updateParams = (updates: { [key: string]: string | undefined | null }) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      // BẪY DỮ LIỆU: Nếu value rỗng, null, undefined hoặc 'all' (với bộ lọc mặc định),
      // PHẢI dùng nextParams.delete(key) để xoá sạch param khỏi URL,
      // Tuyệt đối không để lại ?q= hoặc ?category=all rác trên thanh địa chỉ.
      if (!value || value.trim() === '' || (key === 'category' && value === 'all') || (key === 'level' && value === 'all') || (key === 'sort' && value === 'relevance')) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value.trim());
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  // Xử lý khi gõ tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateParams({ q: value });
  };

  // Xóa rỗng tìm kiếm (Bẫy dữ liệu: Xóa sạch ?q khỏi URL)
  const handleClearSearch = () => {
    setSearchTerm('');
    updateParams({ q: '' });
  };

  // Reset toàn bộ bộ lọc
  const handleResetAll = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters = Boolean(
    queryFromUrl.trim() ||
    categoryFromUrl !== 'all' ||
    levelFromUrl !== 'all' ||
    sortFromUrl !== 'relevance'
  );

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Top row: Search Input & Reset Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input with 2-way sync & Clear Button */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm theo tên khóa học, giảng viên, công nghệ (React, Node, Docker)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              title="Xóa từ khóa (Loại bỏ ?q khỏi URL)"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
            >
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300">
                <X className="w-3.5 h-3.5 text-slate-700" />
              </div>
            </button>
          )}
        </div>

        {/* Reset All Filters button */}
        {hasActiveFilters && (
          <button
            onClick={handleResetAll}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Filter Row: Category pills, Level dropdown, Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
        {/* Category Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            Danh mục Chuyên môn:
          </label>
          <select
            value={categoryFromUrl}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 transition"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend & Microservices</option>
            <option value="fullstack">Fullstack Master</option>
            <option value="devops">DevOps & Cloud</option>
            <option value="mobile">Mobile Apps</option>
          </select>
        </div>

        {/* Level Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            Cấp độ Yêu cầu:
          </label>
          <select
            value={levelFromUrl}
            onChange={(e) => updateParams({ level: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 transition"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="beginner">Cơ bản (Beginner)</option>
            <option value="intermediate">Trung cấp (Intermediate)</option>
            <option value="advanced">Nâng cao (Advanced)</option>
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-teal-600" />
            Sắp xếp Kết quả:
          </label>
          <select
            value={sortFromUrl}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 transition"
          >
            <option value="relevance">Độ liên quan / Mặc định</option>
            <option value="rating-desc">Đánh giá cao nhất (⭐)</option>
            <option value="popular">Học viên đông nhất (🔥)</option>
            <option value="price-asc">Học phí: Thấp đến Cao</option>
            <option value="price-desc">Học phí: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      {/* Live URL Query String Inspector Widget */}
      <div className="pt-2">
        <div className="p-3 bg-slate-900 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full">
            <span className="text-emerald-400 font-bold">URL Params:</span>
            <span className="text-slate-100 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {window.location.search || '(Trống - Không có tham số rác)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-teal-400 font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Tìm thấy <strong>{totalResults}</strong> kết quả</span>
          </div>
        </div>
      </div>
    </div>
  );
};
