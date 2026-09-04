import React from 'react';
import { LayoutDashboard, Award, BookOpen, Clock, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/50" />
          <div>
            <h2 className="text-xl font-bold text-white">Bảng Điều Khiển: {user?.name}</h2>
            <p className="text-xs text-slate-400">Email: {user?.email} • Vai trò: <span className="uppercase font-semibold text-indigo-400">{user?.role}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, label: 'Khóa học đã đăng ký', val: '4 Khóa' },
          { icon: Clock, label: 'Giờ học tích lũy', val: '128 Giờ' },
          { icon: Award, label: 'Chứng chỉ tốt nghiệp', val: '2 Đã cấp' },
        ].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>{item.label}</span>
                <IconComp className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white">{item.val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
