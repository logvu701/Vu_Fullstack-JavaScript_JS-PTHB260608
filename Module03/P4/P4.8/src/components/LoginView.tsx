import React, { useState } from "react";
import { Lock, Mail, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface LoginViewProps {
  onLoginSuccess: () => void;
  redirectReason?: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  redirectReason,
}) => {
  const [email, setEmail] = useState("admin@enterprise.vn");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden p-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-600/30">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Cổng Đăng Nhập Quản Trị</h2>
          <p className="text-xs text-slate-500">
            Hệ thống xác thực bảo mật dành cho Quản trị viên
          </p>
        </div>

        {/* Redirect Notice Banner (if triggered by 401 Interceptor) */}
        {redirectReason && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-800 space-y-1 animate-pulse">
            <div className="font-bold flex items-center gap-1.5 text-rose-900">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>ĐIỀU HƯỚNG BỞI RESPONSE INTERCEPTOR TOÀN CỤC</span>
            </div>
            <p className="leading-relaxed text-[11px]">{redirectReason}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Quản trị
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Đăng Nhập Khôi Phục Phiên</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400">
          Nhấn nút để cấp Token mới và quay trở lại Dashboard Quản trị.
        </div>
      </div>
    </div>
  );
};
