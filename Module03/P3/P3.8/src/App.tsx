import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Header } from './components/Header';
import { DisputeTable } from './components/DisputeTable';
import { OptimisticTimelineWidget } from './components/OptimisticTimelineWidget';
import { OptimisticDocModal } from './components/OptimisticDocModal';
import { resetMockDisputes } from './api/disputeApi';
import type { DisputeLog } from './types/dispute';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export function App() {
  const queryClient = useQueryClient();
  const [isOptimisticMode, setIsOptimisticMode] = useState<boolean>(true);
  const [shouldSimulateError, setShouldSimulateError] = useState<boolean>(false);
  const [logs, setLogs] = useState<DisputeLog[]>([]);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isDocOpen, setIsDocOpen] = useState<boolean>(false);

  const handleAddLog = (log: DisputeLog) => {
    setLogs((prev) => [log, ...prev].slice(0, 30));
  };

  const handleResetData = () => {
    resetMockDisputes();
    queryClient.invalidateQueries({ queryKey: ['disputes'] });
    setLogs([]);
    setToast({
      type: 'success',
      message: 'Đã reset lại toàn bộ dữ liệu khiếu nại mẫu!',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top duration-300 max-w-md">
          <div
            className={`p-4 rounded-xl border shadow-2xl flex items-start gap-3 ${
              toast.type === 'error'
                ? 'bg-rose-950/95 border-rose-800 text-rose-100'
                : 'bg-emerald-950/95 border-emerald-800 text-emerald-100'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        isOptimisticMode={isOptimisticMode}
        setIsOptimisticMode={setIsOptimisticMode}
        shouldSimulateError={shouldSimulateError}
        setShouldSimulateError={setShouldSimulateError}
        onResetData={handleResetData}
        onOpenDoc={() => setIsDocOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Banner Thông Báo Trạng Thái Mô Phỏng */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold text-slate-200">
                Chế độ Thử nghiệm: {isOptimisticMode ? '⚡ Phản hồi Thời gian thực (Optimistic)' : '⏳ Chặn UI Chờ Server (Pessimistic)'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {shouldSimulateError
                ? '⚠️ Máy chủ đang được cấu hình để ném lỗi 500 sau 2.0 giây nhằm kiểm tra tính năng khôi phục (Rollback).'
                : '✅ Máy chủ hoạt động bình thường với độ trễ phản hồi tiêu chuẩn là 2000ms.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold border ${
                shouldSimulateError
                  ? 'bg-rose-950 text-rose-300 border-rose-700'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-700'
              }`}
            >
              {shouldSimulateError ? 'Server Error (500) ON' : 'Server OK (200 OK)'}
            </span>
          </div>
        </div>

        {/* Dispute Resolution Table */}
        <DisputeTable
          isOptimisticMode={isOptimisticMode}
          shouldSimulateError={shouldSimulateError}
          onAddLog={handleAddLog}
          onSetToast={setToast}
        />

        {/* Timeline Log Widget */}
        <OptimisticTimelineWidget
          logs={logs}
          onClearLogs={() => setLogs([])}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Dispute Resolution Desk — Hoàn thành Bài 8: Optimistic Updates & Error Rollback với TanStack Query.
      </footer>

      {/* Technical Documentation Modal */}
      <OptimisticDocModal
        isOpen={isDocOpen}
        onClose={() => setIsDocOpen(false)}
      />
    </div>
  );
}

export default App;
