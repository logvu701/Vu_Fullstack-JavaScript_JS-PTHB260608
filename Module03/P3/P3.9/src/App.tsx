import React, { useState } from 'react';
import { useBoundStore } from './store/useBoundStore';
import { Header } from './components/Header';
import { AuthPanel } from './components/AuthPanel';
import { ApiRequesterInspector } from './components/ApiRequesterInspector';
import { ToastContainer } from './components/ToastContainer';
import { SlicesDocModal } from './components/SlicesDocModal';
import { Shield, Sparkles, Database, Layers } from 'lucide-react';

export function App() {
  const { theme } = useBoundStore();
  const [isDocOpen, setIsDocOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white'
          : 'bg-slate-50 text-slate-900 selection:bg-purple-200 selection:text-purple-900'
      }`}
    >
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}
      <Header onOpenDoc={() => setIsDocOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Banner Kiến Trúc */}
        <div
          className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border-purple-900/40'
              : 'bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-purple-200 shadow-sm'
          }`}
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold tracking-tight">
                Mô Hình Quản Lý State Lát Cắt (Slices) & Vanilla JS Bridge
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ứng dụng tách biệt rõ ràng giữa <code>AuthSlice</code> (quản lý token JWT, trạng thái đăng nhập) và <code>UISlice</code> (quản lý giao diện, theme sáng/tối, hàng đợi thông báo toast). Các module thuần JavaScript (Axios Interceptors) đọc state trực tiếp qua <code>useBoundStore.getState()</code> mà không cần khởi tạo React Context hay truyền Props.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`p-3 rounded-xl border flex items-center gap-3 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <Database className="w-5 h-5 text-purple-400" />
              <div className="text-xs">
                <p className="font-bold">Zustand Slices</p>
                <p className="text-[10px] text-purple-400 font-mono">Bound Store Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid 2 Cột: Auth Panel bên trái, Inspector bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <AuthPanel />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ApiRequesterInspector />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 text-center text-xs transition ${
          theme === 'dark'
            ? 'border-slate-900 bg-slate-950 text-slate-500'
            : 'border-slate-200 bg-white text-slate-500'
        }`}
      >
        © 2026 Rikkei Academy — Hoàn thành Bài 9: Kiến trúc Zustand Slices & Vanilla JS Axios Interceptors.
      </footer>

      {/* Technical Documentation Modal */}
      <SlicesDocModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} />
    </div>
  );
}

export default App;
