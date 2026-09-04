import React from 'react';
import { Plus, Check, Star, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import type { Course } from '../types/cart';

interface CourseCatalogProps {
  courses: Course[];
  cartItemIds: Set<string>;
  onAddToCart: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  cartItemIds,
  onAddToCart,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-600" />
            Danh mục Khóa học Khả dụng
          </h3>
          <p className="text-xs text-slate-500">
            Chọn khóa học để thêm vào giỏ hàng và kiểm thử tính toàn vẹn dữ liệu
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => {
          const isAdded = cartItemIds.has(course.id);

          return (
            <div
              key={course.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                isAdded
                  ? 'bg-orange-50/40 border-orange-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {course.category}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>GV: {course.instructor}</span>
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-orange-600">
                    {formatCurrency(course.price)}
                  </div>
                  <div className="text-[10px] text-slate-400 line-through">
                    {formatCurrency(course.originalPrice)}
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(course)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isAdded
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
                  }`}
                  title={isAdded ? 'Thử click lại để kiểm tra bẫy dữ liệu trùng lặp!' : 'Thêm vào giỏ'}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-orange-600" />
                      <span>Đã có trong giỏ</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm vào giỏ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
