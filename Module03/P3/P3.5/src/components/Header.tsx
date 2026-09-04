import React from 'react';
import { Package, GitMerge, BookOpen, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenFlow: () => void;
  isFetching: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFlow, isFetching }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Order Dashboard Pro
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                P3.5 Zustand + TanStack
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Đồng bộ Client State (Zustand) & Server State (TanStack Query)
            </p>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Query Key Live Sync Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${isFetching ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="text-slate-300 font-medium">
              {isFetching ? 'Đang đồng bộ API...' : 'Server State Synced'}
            </span>
          </div>

          <button
            onClick={onOpenFlow}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white transition shadow-sm"
          >
            <GitMerge className="w-4 h-4" />
            <span>Sơ đồ Luồng (I/O)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
