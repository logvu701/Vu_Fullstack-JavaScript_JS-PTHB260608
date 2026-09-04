import React from 'react';
import { Cpu, Zap, Layers, CheckCircle2, ShieldCheck, Code, X } from 'lucide-react';

interface PerformanceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PerformanceReportModal: React.FC<PerformanceReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Báo cáo Phân tích Hiệu năng: Tối ưu hóa Ma trận Tính toán (useMemo & useCallback)
            </h3>
            <p className="text-xs text-slate-400">
              Nguyên nhân Re-render & Cơ chế Bypass Tính toán với Strict Equality (Object.is)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              1. Tại sao Re-render lại xảy ra và gây đơ giao diện?
            </h4>
            <p>
              Khi một State ở Parent Component thay đổi (ví dụ: click nút "Đã kiểm tra" hoặc tăng bộ đếm click), React kích hoạt vòng lặp render lại toàn bộ component function.
            </p>
            <p>
              Nếu không có <code>useMemo</code>, một hàm tính toán nặng duyệt qua <strong>5.000 học viên</strong> kèm tính toán ma trận điểm số sẽ buộc phải chạy lại từ đầu trên Main Thread. Điều này làm block Event Loop, khiến trình duyệt bị giật lag và giảm FPS nghiêm trọng.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              2. Cơ chế Bypass của Bộ nhớ đệm (Cache Bypass Mechanism)
            </h4>
            <p>
              <code>useMemo</code> ghi nhớ kết quả tính toán giữa các lần render. Trong các lần re-render tiếp theo, React so sánh từng phần tử trong Dependency Array với giá trị ở lần render trước bằng thuật toán <strong>Strict Equality (`Object.is` / `===`)</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
              <li>Nếu tất cả dependencies (<code>[students, searchQuery, selectedDept, minGPA, sortBy]</code>) không thay đổi (`===`), React <strong>BỎ QUA HOÀN TOÀN</strong> việc thực thi function tính toán và trả về ngay tham chiếu đã lưu trong cache (0ms runtime!).</li>
              <li>Khi có ít nhất 1 dependency thay đổi, React mới tính toán lại và cập nhật cache mới.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              3. Triển khai Mã nguồn Tuân thủ Strict Equality
            </h4>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`// 1. Khóa bộ nhớ đệm kết quả lọc 5.000 phần tử
const { filteredStudents, analytics } = useMemo(() => {
  return executeHeavyStudentAnalytics(allStudents, filters);
}, [allStudents, filters.searchQuery, filters.selectedDepartment, filters.minGPA, filters.sortBy]);

// 2. Khóa tham chiếu hàm sự kiện để tránh re-render các Memoized Component con
const handleFilterChange = useCallback((updates: Partial<FilterConfig>) => {
  setFilters((prev) => ({ ...prev, ...updates }));
}, []);`}
            </pre>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu cơ chế hiệu năng
          </button>
        </div>
      </div>
    </div>
  );
};
