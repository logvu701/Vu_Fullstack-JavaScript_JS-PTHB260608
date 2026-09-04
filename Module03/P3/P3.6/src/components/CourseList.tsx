import React from 'react';
import { Star, Users, Clock, ArrowRight, Frown, Sparkles, BookOpen } from 'lucide-react';
import type { Course } from '../types/course';

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, searchQuery }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Frown className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">Không tìm thấy khóa học phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Không có kết quả nào khớp với từ khóa "{searchQuery}" hoặc các tiêu chí bộ lọc đã chọn. Hãy thử thay đổi bộ lọc hoặc xóa ô tìm kiếm.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative h-44 overflow-hidden bg-slate-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg uppercase">
              {course.category}
            </div>
            <div className="absolute top-3 right-3 bg-teal-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow uppercase">
              {course.level}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Giảng viên:</span>
                <strong className="text-slate-800 font-medium">{course.instructor}</strong>
              </div>
              <h4 className="font-bold text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-teal-600 transition-colors">
                {course.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta & Price */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{course.durationHours} giờ học</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>{course.studentsCount} học viên</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-base font-extrabold text-teal-700">
                    {formatCurrency(course.price)}
                  </div>
                  <div className="text-[11px] text-slate-400 line-through">
                    {formatCurrency(course.originalPrice)}
                  </div>
                </div>

                <button className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition flex items-center gap-1 shadow-sm">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
