import React, { useState } from 'react';
import { useBoundStore } from '../store/useBoundStore';
import type { UserRole } from '../types/store';
import { ShieldCheck, KeyRound, LogIn, LogOut, CheckCircle2, UserCheck, Copy, Check } from 'lucide-react';

export const AuthPanel: React.FC = () => {
  const { user, token, isAuthenticated, login, logout, addToast } = useBoundStore();
  const [copied, setCopied] = useState(false);
  const [customUsername, setCustomUsername] = useState('admin_master');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleQuickLogin = (role: UserRole, username: string) => {
    login(username, role);
    addToast({
      type: 'success',
      message: `🔐 Đăng nhập thành công với vai trò ${role.toUpperCase()} (${username})`,
    });
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUsername.trim()) return;
    login(customUsername.trim(), selectedRole);
    addToast({
      type: 'success',
      message: `🔐 Đăng nhập thành công với tài khoản "${customUsername}" (${selectedRole})`,
    });
  };

  const handleCopyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({
      type: 'info',
      message: '📋 Đã copy JWT Token vào Clipboard!',
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Auth Slice (Trạng Thái Xác Thực)</h2>
            <p className="text-xs text-slate-400">Quản lý JWT Token & Thông tin User trong Zustand Slice</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isAuthenticated
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-rose-950 text-rose-300 border-rose-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            {isAuthenticated ? 'Authenticated' : 'Unauthenticated'}
          </span>
        </div>
      </div>

      {/* State View */}
      {isAuthenticated && user ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-xl border-2 border-purple-500/60 object-cover shadow-md"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-100">{user.name}</h3>
                <p className="text-xs text-slate-400">Username: <span className="font-mono text-purple-300">@{user.username}</span></p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    Role: {user.role}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">ID: {user.id}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                addToast({
                  type: 'warning',
                  message: '🚪 Đã đăng xuất. Token được đưa về null!',
                });
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800 text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất (Reset Token)</span>
            </button>
          </div>

          {/* Token Inspector */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                JWT Bearer Token (Đang lưu trong AuthSlice):
              </span>
              <button
                onClick={handleCopyToken}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Đã chép' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-mono text-[11px] text-purple-300 break-all bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
              {token}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Chọn tài khoản mẫu để đăng nhập tức thì hoặc nhập thông tin tùy chỉnh:
          </div>

          {/* Quick Login Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleQuickLogin('admin', 'admin_super')}
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-600/60 text-left transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">Admin Quản Trị</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 font-mono">FULL</span>
              </div>
              <p className="text-[11px] text-slate-400">Truy cập toàn bộ API bảo mật (/api/admin/metrics)</p>
            </button>

            <button
              onClick={() => handleQuickLogin('manager', 'manager_lead')}
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-600/60 text-left transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">Manager Trưởng Phòng</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono">MGMT</span>
              </div>
              <p className="text-[11px] text-slate-400">Truy cập báo cáo, không xem được Admin Metrics</p>
            </button>

            <button
              onClick={() => handleQuickLogin('staff', 'staff_operator')}
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-600/60 text-left transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300">Staff Nhân Viên</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">USER</span>
              </div>
              <p className="text-[11px] text-slate-400">Chỉ có quyền cơ bản và truy cập API công khai</p>
            </button>
          </div>

          {/* Custom Login Form */}
          <form onSubmit={handleCustomLogin} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row gap-3 items-end">
            <div className="w-full sm:flex-1 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Tài khoản tùy chỉnh</label>
              <input
                type="text"
                value={customUsername}
                onChange={(e) => setCustomUsername(e.target.value)}
                placeholder="Nhập username..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="w-full sm:w-44 space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Vai trò (Role)</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/20 shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
