import React from 'react';
import { Timer, Zap, CheckSquare, Sparkles, Scale, Trash2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'quiz' | 'flashSale' | 'comparison' | 'unmountTest';
  setActiveTab: (tab: 'quiz' | 'flashSale' | 'comparison' | 'unmountTest') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Timer className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">
                Countdown Architecture
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                P3.7 Custom Hook
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Trừu tượng hóa Logic trạng thái với <code>useCountdown</code>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Phòng Thi Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('flashSale')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              activeTab === 'flashSale'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Flash Sale</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              activeTab === 'comparison'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>So sánh Return Type</span>
          </button>

          <button
            onClick={() => setActiveTab('unmountTest')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              activeTab === 'unmountTest'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-300" />
            <span>Test Unmount Cleanup</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
