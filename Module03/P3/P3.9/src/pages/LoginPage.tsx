import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, LogIn, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Lấy đường dẫn trang trước đó mà người dùng định truy cập (nếu có từ ProtectedRoute redirect sang)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/classroom/react-pro-room';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);

    // BẪY DỮ LIỆU: Sử dụng { replace: true } để thay thế entry /login trong History Stack!
    // Nhờ đó, khi người dùng bấm nút "Back" trên trình duyệt, họ KHÔNG bị đẩy ngược lại form Đăng nhập!
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto my-10 space-y-6">
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-md">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Xác thực Tài khoản</h2>
          <p className="text-xs text-slate-400">
            Trang bạn định truy cập (<strong>{from}</strong>) nằm trong phân hệ bảo mật. Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        {/* Redirect notice if redirected from protected route */}
        {location.state?.from && (
          <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-2xl flex items-start gap-2.5 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Hệ thống đã tự động chặn truy cập trực tiếp URL <code>{from}</code> và lưu vị trí chuyển hướng.
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Chọn vai trò đăng nhập thử nghiệm:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'student' as UserRole, label: 'Học viên' },
                { role: 'instructor' as UserRole, label: 'Giảng viên' },
                { role: 'admin' as UserRole, label: 'Admin' },
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedRole(item.role)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    selectedRole === item.role
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
            <div>Email: <strong className="text-slate-200">{selectedRole}@rikkei.edu.vn</strong></div>
            <div>Target Return: <strong className="text-purple-400">{from}</strong></div>
            <div>Stack Option: <strong className="text-emerald-400">&#123; replace: true &#125;</strong></div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập & Quay lại Phòng học</span>
          </button>
        </form>

        {/* Data Trap Note */}
        <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-2xl text-[11px] text-purple-300 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            Sau khi đăng nhập, nếu bấm nút <strong>Back</strong> trên trình duyệt, bạn sẽ quay về trang trước đó thay vì bị lặp lại form đăng nhập này.
          </span>
        </div>
      </div>
    </div>
  );
};
