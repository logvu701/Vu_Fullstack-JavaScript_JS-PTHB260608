import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-slate-800/80 border border-slate-700 rounded-3xl text-center space-y-5 shadow-2xl">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">403 - Quyền Truy Cập Bị Từ Chối</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tài khoản của bạn ({user?.email}) có vai trò <strong>{user?.role}</strong>, không đủ thẩm quyền để truy cập trang này.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
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
