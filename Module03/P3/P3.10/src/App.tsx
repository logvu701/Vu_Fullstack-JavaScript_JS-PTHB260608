import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PerformanceProfiler } from './components/PerformanceProfiler';
import { AuditHeaderPanel } from './components/AuditHeaderPanel';
import { FilterToolbar } from './components/FilterToolbar';
import { StudentTable } from './components/StudentTable';
import { PerformanceReportModal } from './components/PerformanceReportModal';

import { generate5000Students } from './utils/generateStudents';
import { executeHeavyStudentAnalytics, totalHeavyComputationsCount, resetComputationCount } from './utils/heavyComputation';
import type { Student, FilterConfig } from './types/student';

export function App() {
  // 1. Dataset 5.000 học viên cố định
  const [allStudents] = useState<Student[]>(() => generate5000Students());

  // 2. State bộ lọc
  const [filters, setFilters] = useState<FilterConfig>({
    searchQuery: '',
    selectedDepartment: 'All',
    minGPA: 2.0,
    sortBy: 'name-asc',
  });

  // 3. State độc lập (BẪY DỮ LIỆU)
  const [isAuditedAll, setIsAuditedAll] = useState(false);
  const [independentClickCount, setIndependentClickCount] = useState(0);

  // 4. Toggle chế độ tối ưu hóa useMemo
  const [isOptimized, setIsOptimized] = useState(true);

  // 5. Quản lý Modal & Bộ đếm render
  const [isReportOpen, setIsReportOpen] = useState(false);
  const renderCounterRef = useRef(0);
  renderCounterRef.current += 1;

  // 6. Tính toán kết quả có useMemo (CHẾ ĐỘ TỐI ƯU) vs Không useMemo (CHẾ ĐỘ CHƯA TỐI ƯU)
  const optimizedResult = useMemo(() => {
    return executeHeavyStudentAnalytics(allStudents, filters);
  }, [
    allStudents,
    filters.searchQuery,
    filters.selectedDepartment,
    filters.minGPA,
    filters.sortBy,
  ]);

  // Khi tắt useMemo, tính toán trực tiếp trên mỗi lần render
  const currentResult = isOptimized
    ? optimizedResult
    : executeHeavyStudentAnalytics(allStudents, filters);

  // 7. useCallback cho các hàm sự kiện để giữ nguyên tham chiếu hàm (Referential Equality)
  const handleFilterChange = useCallback((updates: Partial<FilterConfig>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleToggleAuditAll = useCallback(() => {
    setIsAuditedAll((prev) => !prev);
  }, []);

  const handleIncrementIndependentCount = useCallback(() => {
    setIndependentClickCount((prev) => prev + 1);
  }, []);

  const handleResetCounts = () => {
    resetComputationCount();
    setIndependentClickCount(0);
    renderCounterRef.current = 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header
        isOptimized={isOptimized}
        onToggleOptimization={() => setIsOptimized((prev) => !prev)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Realtime Performance Profiler Bar */}
        <PerformanceProfiler
          analytics={currentResult.analytics}
          computationCount={totalHeavyComputationsCount}
          renderCount={renderCounterRef.current}
          isOptimized={isOptimized}
          onResetCounts={handleResetCounts}
        />

        {/* Audit Status Guard Panel (Data Trap Feature) */}
        <AuditHeaderPanel
          isAuditedAll={isAuditedAll}
          onToggleAuditAll={handleToggleAuditAll}
          independentClickCount={independentClickCount}
          onIncrementIndependentCount={handleIncrementIndependentCount}
          isOptimized={isOptimized}
        />

        {/* Filters Toolbar */}
        <FilterToolbar filters={filters} onFilterChange={handleFilterChange} />

        {/* 5,000 Students Table */}
        <StudentTable students={currentResult.filteredStudents} />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 10: Tối ưu hóa ma trận hiệu năng hệ thống (useMemo & useCallback).
      </footer>

      {/* Performance Deep-dive Report Modal */}
      <PerformanceReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}

export default App;
