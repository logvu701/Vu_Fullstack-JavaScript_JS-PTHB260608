import React from 'react';
import { DollarSign, Users, BookOpen, Clock, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: 'revenue' | 'staff';
  setActiveTab: (tab: 'revenue' | 'staff') => void;
  onOpenDoc: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenDoc }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Executive Analytics Hub
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                P3.6 StaleTime (5 Mins)
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Quản lý Vòng đời Cache: StaleTime vs Background Refetch
            </p>
          </div>
        </div>

        {/* Tab switcher & Doc button */}
        <div className="flex items-center gap-3">
          {/* Tab Navigation */}
          <nav className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-2xl border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('revenue')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition ${
                activeTab === 'revenue'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Doanh Thu (5m Stale)</span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition ${
                activeTab === 'staff'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Nhân Sự (Staff)</span>
            </button>
          </nav>

          <button
            onClick={onOpenDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white transition border border-slate-700"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Vòng đời Cache</span>
          </button>
        </div>
      </div>
    </header>
  );
};
