import React, { useState } from "react";
import { ParamCleanerDemo } from "./components/ParamCleanerDemo";
import { ApiTestBench } from "./components/ApiTestBench";
import { ExecutionLogTable } from "./components/ExecutionLogTable";
import { ExceptionsMatrixModal } from "./components/ExceptionsMatrixModal";
import { ClientExecutionLog } from "./api/client/types";
import {
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Zap,
  Code2,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [logs, setLogs] = useState<ClientExecutionLog[]>([]);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  const handleAddLog = (log: ClientExecutionLog) => {
    setLogs((prev) => [log, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.10 - Mini Module: Giao Tiếp API Kháng Lỗi
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  Resilient API Client
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Đóng gói Module độc lập • Timeout 5000ms • cleanParams • Unwrap data • Chặn lỗi 401 & 500
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMatrixOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ma Trận Ngoại Lệ (8 Kịch Bản)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Module Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Timeout Enforcer</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              5,000 ms
            </div>
            <p className="text-[11px] text-slate-500">Tự động ngắt kết nối khi quá 5s</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Param Sanitizer</span>
            </div>
            <div className="text-xl font-bold text-emerald-600 font-mono">
              cleanParams()
            </div>
            <p className="text-[11px] text-slate-500">Loại bỏ undefined, null, NaN, ""</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Unwrapped Response</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              response.data
            </div>
            <p className="text-[11px] text-slate-500">Ẩn hoàn toàn metadata Axios</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-purple-600" />
              <span>Standard Exports</span>
            </div>
            <div className="text-xs font-bold text-purple-700 font-mono">
              get, post, put, remove
            </div>
            <p className="text-[11px] text-slate-500">Tách biệt 100% với UI Components</p>
          </div>
        </div>

        {/* Section 1: Data Trap - Param Cleaner Demo */}
        <ParamCleanerDemo />

        {/* Section 2: Standardized Methods Test Bench */}
        <ApiTestBench onLogAdded={handleAddLog} logs={logs} />

        {/* Section 3: Execution Audit Log */}
        <ExecutionLogTable logs={logs} />
      </main>

      {/* Exception Matrix Modal */}
      <ExceptionsMatrixModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
      />
    </div>
  );
}
