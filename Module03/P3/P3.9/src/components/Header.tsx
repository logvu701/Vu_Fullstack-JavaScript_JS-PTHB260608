import React from 'react';
import { useBoundStore } from '../store/useBoundStore';
import { Layers, Sun, Moon, Shield, BookOpen, LogOut, UserCircle } from 'lucide-react';

interface HeaderProps {
  onOpenDoc: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDoc }) => {
  const { user, isAuthenticated, logout, theme, toggleTheme } = useBoundStore();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Zustand Slices & Axios Interceptors
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                P3.9 Vanilla JS State
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Quản lý Store lát cắt (Slices) & Đọc State ngoài React trong Axios Interceptors
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title={`Chuyển giao diện: Hiện tại ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* User profile / Logout */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-purple-500 object-cover"
              />
              <div className="hidden md:block text-left text-xs">
                <p className="font-bold text-slate-200">{user.name}</p>
                <p className="text-[10px] uppercase font-semibold text-purple-400">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:text-rose-300 hover:bg-slate-700 border border-slate-700 transition ml-1"
                title="Đăng xuất tài khoản"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-400 font-medium">
              <UserCircle className="w-4 h-4 text-slate-400" />
              <span>Chưa đăng nhập</span>
            </div>
          )}

          {/* Documentation modal button */}
          <button
            onClick={onOpenDoc}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Tài liệu Kiến trúc Zustand Slices & Vanilla JS"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
