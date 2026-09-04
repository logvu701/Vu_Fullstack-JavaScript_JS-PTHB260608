import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Video, LayoutDashboard, UserCheck, LogIn, LogOut, GitBranch, Layers, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenTree: () => void;
  onOpenHistoryStack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTree, onOpenHistoryStack }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Rikkei Security LMS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  P3.9 Protected Routes
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Kiến trúc Luồng Truy cập Bảo mật</p>
            </div>
          </Link>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
          <Link
            to="/"
            className={`px-3 py-2 rounded-xl transition ${
              isActive('/') ? 'bg-slate-800 text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trang chủ (Public)
          </Link>

          <Link
            to="/classroom/react-pro-room"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              location.pathname.startsWith('/classroom')
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-purple-400" />
            <span>Phòng Học Ảo (Protected)</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              isActive('/dashboard')
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Học viên</span>
          </Link>

          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
              isActive('/admin')
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span>Admin Portal</span>
          </Link>
        </nav>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenTree}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            <span>Cây Định Tuyến</span>
          </button>

          <button
            onClick={onOpenHistoryStack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900 transition"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Inspector History Stack</span>
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover border border-purple-500/40"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</div>
                <div className="text-[10px] text-purple-400 uppercase font-semibold">{user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition shadow-md shadow-purple-600/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
