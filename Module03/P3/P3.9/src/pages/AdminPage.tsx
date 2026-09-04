import React from 'react';
import { Shield, Users, Server, Activity, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="p-8 rounded-3xl bg-rose-950/40 border border-rose-800/80 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Admin Management Portal (Vùng Cấm)</h2>
              <span className="px-2 py-0.5 rounded-full bg-rose-900 text-rose-200 text-[10px] font-bold">
                ROOT ACCESS
              </span>
            </div>
            <p className="text-xs text-rose-300">
              Được bảo vệ bởi <code>&lt;ProtectedRoute allowedRoles={['admin']}&gt;</code>. Chỉ tài khoản Quản trị viên mới được phép truy cập.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
          <span className="text-xs text-slate-400">Tổng số học viên trực tuyến</span>
          <div className="text-2xl font-bold text-white">1,420</div>
        </div>
        <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
          <span className="text-xs text-slate-400">Phòng học đang phát sóng</span>
          <div className="text-2xl font-bold text-emerald-400">12 Live</div>
        </div>
        <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
          <span className="text-xs text-slate-400">Lượt chặn truy cập trái phép</span>
          <div className="text-2xl font-bold text-rose-400">18 Lần / 24h</div>
        </div>
      </div>
    </div>
  );
};
