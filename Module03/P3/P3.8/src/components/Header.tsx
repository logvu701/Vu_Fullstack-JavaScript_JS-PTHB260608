import React from 'react';
import { ShieldCheck, Zap, AlertTriangle, BookOpen, RotateCcw, Bug } from 'lucide-react';

interface HeaderProps {
  isOptimisticMode: boolean;
  setIsOptimisticMode: (val: boolean) => void;
  shouldSimulateError: boolean;
  setShouldSimulateError: (val: boolean) => void;
  onResetData: () => void;
  onOpenDoc: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOptimisticMode,
  setIsOptimisticMode,
  shouldSimulateError,
  setShouldSimulateError,
  onResetData,
  onOpenDoc,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Dispute Resolution Desk
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                P3.8 Optimistic Updates
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Trải nghiệm Thời gian thực (t = 0.0s) & Cơ chế Rollback Tự động
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Mode switch */}
          <button
            onClick={() => setIsOptimisticMode(!isOptimisticMode)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              isOptimisticMode
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isOptimisticMode ? 'Optimistic Mode (t=0.0s)' : 'Pessimistic Mode (Chờ 2s)'}</span>
          </button>

          {/* Simulate 500 Error Toggle */}
          <button
            onClick={() => setShouldSimulateError(!shouldSimulateError)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              shouldSimulateError
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-slate-800 text-rose-400 border-slate-700 hover:bg-slate-700'
            }`}
            title="Bật tính năng này để kiểm tra onError Rollback khi server lỗi 500"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{shouldSimulateError ? 'Mô phỏng Lỗi 500: BẬT' : 'Mô phỏng Lỗi: TẮT'}</span>
          </button>

          <button
            onClick={onResetData}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset dữ liệu mẫu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDoc}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Tài liệu kỹ thuật onMutate / onError / onSettled"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
