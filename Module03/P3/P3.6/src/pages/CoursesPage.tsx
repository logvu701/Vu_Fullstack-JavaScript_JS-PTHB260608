import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { CourseList } from '../components/CourseList';
import { EventFlowVisualizer } from '../components/EventFlowVisualizer';
import { ShareModal } from '../components/ShareModal';
import { DocModal } from '../components/DocModal';
import { MOCK_COURSES } from '../data/mockCourses';
import type { CourseCategory, CourseLevel, SortOption } from '../types/course';

export const CoursesPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Đọc các giá trị filter từ URL
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const category = (searchParams.get('category') as CourseCategory) || 'all';
  const level = (searchParams.get('level') as CourseLevel) || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'relevance';

  // Lọc và sắp xếp khóa học dựa trên tham số URL
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      // 1. Lọc theo từ khóa
      if (query) {
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.toLowerCase().includes(query);
        const matchesTag = course.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesTag) {
          return false;
        }
      }

      // 2. Lọc theo danh mục
      if (category !== 'all' && course.category !== category) {
        return false;
      }

      // 3. Lọc theo cấp độ
      if (level !== 'all' && course.level !== level) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sắp xếp
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'popular':
          return b.studentsCount - a.studentsCount;
        case 'relevance':
        default:
          return 0;
      }
    });
  }, [query, category, level, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header
        onOpenFlow={() => setIsFlowOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Banner Hero */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Khám phá Khóa học Lập trình Chuyên sâu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tìm kiếm, lọc và chia sẻ kết quả trực tiếp qua tham số URL với chuẩn đồng bộ thời gian thực
          </p>
        </div>

        {/* Thanh tìm kiếm & bộ lọc đồng bộ URL */}
        <SearchFilterBar totalResults={filteredCourses.length} />

        {/* Danh sách khóa học */}
        <CourseList courses={filteredCourses} searchQuery={query} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 6: Quản lý trạng thái thông qua URL (useSearchParams).
      </footer>

      {/* Modals */}
      <EventFlowVisualizer isOpen={isFlowOpen} onClose={() => setIsFlowOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <DocModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
};
