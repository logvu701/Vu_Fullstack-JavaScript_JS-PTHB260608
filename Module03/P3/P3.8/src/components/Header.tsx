import React from 'react';
import { ShoppingBag, BookOpen, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  itemCount: number;
  onOpenAnalysis: () => void;
}

export const Header: React.FC<HeaderProps> = ({ itemCount, onOpenAnalysis }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Rikkei Course Checkout
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                P3.8 useReducer
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Điều phối trạng thái phức hợp & Ràng buộc toàn vẹn dữ liệu
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition shadow-sm"
          >
            <Layers className="w-4 h-4 text-orange-600" />
            <span>Phân tích useState vs useReducer</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Giỏ hàng:</span>
            <span className="px-1.5 py-0.5 rounded-full bg-orange-500 text-[11px]">
              {itemCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
