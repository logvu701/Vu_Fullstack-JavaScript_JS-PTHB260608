import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-slate-800/80 border border-slate-700 rounded-3xl text-center space-y-5 shadow-2xl">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">404 - Không Tìm Thấy Trang</h2>
        <p className="text-xs text-slate-400">
          Đường dẫn bạn yêu cầu không tồn tại hoặc đã bị di chuyển khỏi hệ thống.
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <Link
          to="/"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Về Trang chủ</span>
        </Link>
      </div>
    </div>
  );
};
