import React from 'react';
import { Sun, Moon, GraduationCap, Sparkles, BookOpen, Bell, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenDocs: () => void;
  onOpenTrapDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDocs, onOpenTrapDemo }) => {
  // Lấy dữ liệu theme và hàm toggleTheme trực tiếp từ ThemeContext qua hook useTheme
  // Không cần nhận qua bất kỳ prop nào từ App!
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                Rikkei Academy LMS
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                P3.5 Context API
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Quản lý Trạng thái Toàn cục (No Prop Drilling)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Docs & Architecture button */}
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Kiến trúc & Báo cáo</span>
          </button>

          {/* Test Exception Trap Button */}
          <button
            onClick={onOpenTrapDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-rose-700 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition"
          >
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Test Bẫy Ngoại Lệ</span>
          </button>

          {/* Notification Mock */}
          <button
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition relative"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Theme Toggle Button (Key Requirement) */}
          <button
            onClick={toggleTheme}
            aria-label="Chuyển đổi giao diện Sáng / Tối"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-amber-500 transform transition-transform duration-300 rotate-0 group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-sky-400 transform transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
              )}
            </div>
            <span className="text-xs font-semibold capitalize">
              {theme === 'light' ? 'Chế độ Sáng' : 'Chế độ Ban đêm'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </header>
  );
};
