import React from 'react';
import { Cpu, Zap, Activity, BookOpen, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  isOptimized: boolean;
  onToggleOptimization: () => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOptimized,
  onToggleOptimization,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Matrix Performance Hub
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                P3.10 5,000 Records
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Khóa Bộ nhớ Đệm <code>useMemo</code>, <code>useCallback</code> & Bypass Re-render
            </p>
          </div>
        </div>

        {/* Right Switch & Report Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Báo cáo Phân tích Hiệu năng</span>
          </button>

          {/* Mode Switch Button */}
          <button
            onClick={onToggleOptimization}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
              isOptimized
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700 hover:bg-emerald-900/80'
                : 'bg-rose-950/80 text-rose-300 border-rose-700 hover:bg-rose-900/80'
            }`}
            title="Chuyển đổi giữa chế độ tối ưu hóa useMemo và chế độ không tối ưu"
          >
            <Zap className={`w-4 h-4 ${isOptimized ? 'text-emerald-400' : 'text-rose-400'}`} />
            <span>
              {isOptimized ? 'Chế độ: ĐÃ TỐI ƯU (useMemo ON)' : 'Chế độ: CHƯA TỐI ƯU (useMemo OFF)'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
