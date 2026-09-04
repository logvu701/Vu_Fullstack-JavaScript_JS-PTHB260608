import React from 'react';
import { Package2, RotateCcw, GitMerge, Boxes } from 'lucide-react';

interface HeaderProps {
  onResetData: () => void;
  onOpenFlowModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetData, onOpenFlowModal }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Omnichannel Inventory Management
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                P3.10 End-to-End State
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Phối hợp TanStack Query Server State & Zustand Client UI State
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onResetData}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Khôi phục danh sách tồn kho mẫu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Kho</span>
          </button>

          <button
            onClick={onOpenFlowModal}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            title="Xem sơ đồ điều phối trạng thái 2 chiều"
          >
            <GitMerge className="w-4 h-4 text-cyan-400" />
            <span>Sơ Đồ State Flow</span>
          </button>
        </div>
      </div>
    </header>
  );
};
