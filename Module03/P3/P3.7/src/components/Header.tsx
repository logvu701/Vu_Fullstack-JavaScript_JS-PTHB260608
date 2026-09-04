import React from 'react';
import { Users, RefreshCw, Layers, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  solution: 'solution1' | 'solution2';
  setSolution: (sol: 'solution1' | 'solution2') => void;
  onTriggerBackgroundRefetch: () => void;
  onOpenDoc: () => void;
  isFetching: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  solution,
  setSolution,
  onTriggerBackgroundRefetch,
  onOpenDoc,
  isFetching,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">
                Customer UX Intelligence
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                P3.7 isLoading vs isFetching
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Đánh giá Trải nghiệm Người dùng: Hard Loading vs Soft Background Loading
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Solution Switcher */}
          <div className="flex items-center p-1 bg-slate-800 rounded-2xl border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setSolution('solution1')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                solution === 'solution1'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Giải pháp 1 (Lỗi UX)</span>
            </button>

            <button
              onClick={() => setSolution('solution2')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                solution === 'solution2'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Giải pháp 2 (Chuẩn UX)</span>
            </button>
          </div>

          {/* Trigger Background Refetch */}
          <button
            onClick={onTriggerBackgroundRefetch}
            disabled={isFetching}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            title="Kích hoạt Background Refetch để quan sát trải nghiệm của từng giải pháp"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">Kích hoạt Refetch ngầm</span>
          </button>

          <button
            onClick={onOpenDoc}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Báo cáo so sánh UX"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
