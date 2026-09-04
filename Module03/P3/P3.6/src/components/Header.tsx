import React from 'react';
import { Compass, BookOpen, Share2, Activity, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenFlow: () => void;
  onOpenShare: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFlow, onOpenShare, onOpenDocs }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                Rikkei Course Finder
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                P3.6 URL State
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Đồng bộ hóa 2 chiều Bộ lọc qua <code>useSearchParams</code>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenFlow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition shadow-sm"
          >
            <Activity className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Sơ đồ Luồng Sự kiện</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Chia sẻ Link</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-teal-300" />
            <span>Tài liệu & Bẫy URL</span>
          </button>
        </div>
      </div>
    </header>
  );
};
