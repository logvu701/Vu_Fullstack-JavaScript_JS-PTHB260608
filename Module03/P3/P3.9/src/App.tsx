import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ArchitectureTreeModal } from './components/ArchitectureTreeModal';
import { HistoryStackVisualizer } from './components/HistoryStackVisualizer';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { VirtualClassroomPage } from './pages/VirtualClassroomPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [isHistoryStackOpen, setIsHistoryStackOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
          <Navbar
            onOpenTree={() => setIsTreeOpen(true)}
            onOpenHistoryStack={() => setIsHistoryStackOpen(true)}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Protected Routes: Yêu cầu đăng nhập */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/classroom/:roomId" element={<VirtualClassroomPage />} />
              </Route>

              {/* Role-based Protected Route: Dành riêng cho Admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
            © 2026 Rikkei Academy. Hoàn thành Bài 9: Kiến trúc luồng truy cập bảo mật (Protected Routes).
          </footer>

          {/* Architecture Modals */}
          <ArchitectureTreeModal isOpen={isTreeOpen} onClose={() => setIsTreeOpen(false)} />
          <HistoryStackVisualizer isOpen={isHistoryStackOpen} onClose={() => setIsHistoryStackOpen(false)} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
