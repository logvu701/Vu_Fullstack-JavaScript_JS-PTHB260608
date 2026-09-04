import React from 'react';
import { BookOpen, CheckCircle, Code, Cpu, ShieldCheck, X } from 'lucide-react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Báo cáo Kỹ thuật: Bài 5 - Quản lý Trạng thái Toàn cục (Context API)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kiến trúc, Giải pháp Khắc phục Prop Drilling & Xử lý Ngoại lệ An toàn
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              1. Khắc phục Triệt để Vấn đề Prop Drilling
            </h4>
            <p>
              Khi xây dựng tính năng Dark Mode, trạng thái <code>theme</code> và hàm <code>toggleTheme</code> cần được truy cập ở <strong>Header</strong> (nút chuyển đổi), <strong>MainContent</strong> (hiển thị thẻ khóa học theo màu nền), và <strong>Footer</strong> (chân trang).
            </p>
            <p>
              Thay vì truyền props xuyên qua các cấp cha con trung gian, giải pháp Context API cho phép các component con độc lập "subscribe" trực tiếp vào Context Provider thông qua Custom Hook <code>useTheme()</code>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-500" />
              2. Định nghĩa Kiểu Chuẩn TypeScript (Type-Safety)
            </h4>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
{`export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);`}
            </pre>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              3. Xử lý Bẫy Dữ liệu (Defensive Programming Outside Provider)
            </h4>
            <p>
              Nếu Consumer gọi hook khi nằm ngoài vùng bao bọc của <code>ThemeProvider</code>, hook sẽ ném lỗi tường minh:
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
{`export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a <ThemeProvider>!');
  }
  return context;
};`}
            </pre>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
