import React, { useState, useEffect } from "react";
import {
  DEFAULT_USER,
  INITIAL_TOKEN,
  subscribeToErrorEvents,
  subscribeToSessionExpired,
} from "./api/authService";
import { AuthSession, ErrorEventLog } from "./types/errorTypes";
import { AdminDashboard } from "./components/AdminDashboard";
import { LoginView } from "./components/LoginView";
import { ComparisonTableModal } from "./components/ComparisonTableModal";
import { ShieldCheck, ShieldAlert, LogOut, Layers } from "lucide-react";

export default function App() {
  const [session, setSession] = useState<AuthSession>({
    user: DEFAULT_USER,
    token: INITIAL_TOKEN,
  });
  const [currentView, setCurrentView] = useState<"dashboard" | "login">("dashboard");
  const [redirectReason, setRedirectReason] = useState<string | null>(null);
  const [logs, setLogs] = useState<ErrorEventLog[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Subscribe to Interceptor Global Events
  useEffect(() => {
    const unsubErrors = subscribeToErrorEvents((newLog) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    const unsubSession = subscribeToSessionExpired((reason) => {
      // 1. Dọn dẹp session
      setSession({ user: null, token: null });
      // 2. Lưu lý do điều hướng
      setRedirectReason(reason);
      // 3. Chuyển hướng ngay lập tức về trang Login
      setCurrentView("login");
    });

    return () => {
      unsubErrors();
      unsubSession();
    };
  }, []);

  // Handle Login success
  const handleLoginSuccess = () => {
    setSession({
      user: DEFAULT_USER,
      token: INITIAL_TOKEN,
    });
    setRedirectReason(null);
    setCurrentView("dashboard");
  };

  // Manual Logout
  const handleLogout = () => {
    setSession({ user: null, token: null });
    setRedirectReason("Bạn đã chủ động đăng xuất khỏi phiên làm việc.");
    setCurrentView("login");
  };

  // If in Login view
  if (currentView === "login") {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        redirectReason={redirectReason}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dashboard Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.8 - Trạm Kiểm Soát Phản Hồi Toàn Cục
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                  Response Interceptor
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chặn đứng lỗi 401/403/500 • Tự động điều hướng Login • So sánh Đa giải pháp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* User session status badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{session.user?.name} ({session.user?.role})</span>
            </div>

            {/* Comparison button */}
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bảng So Sánh Đa Giải Pháp</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <AdminDashboard
          onLogout={handleLogout}
          onOpenComparison={() => setIsComparisonOpen(true)}
          logs={logs}
        />
      </main>

      {/* Comparison Modal */}
      <ComparisonTableModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </div>
  );
}
