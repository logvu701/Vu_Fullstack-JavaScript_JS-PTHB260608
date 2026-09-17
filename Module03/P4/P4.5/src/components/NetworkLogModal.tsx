import React from "react";
import { ApiLogEntry } from "../types/contact";
import { Terminal, Trash2, X, CheckCircle, XCircle } from "lucide-react";

interface NetworkLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ApiLogEntry[];
  onClearLogs: () => void;
}

export const NetworkLogModal: React.FC<NetworkLogModalProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Nhật Ký Mạng Axios (Live Network Inspector)
              </h3>
              <p className="text-xs text-slate-500">
                Theo dõi chi tiết các request GET, POST, DELETE gửi đến cổng 3004
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearLogs}
              title="Xóa logs"
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Logs list */}
        <div className="p-6 flex-1 overflow-y-auto space-y-3 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              Chưa có yêu cầu API nào được gửi. Hãy thao tác trên danh bạ để xem log!
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className={`p-3.5 rounded-xl border ${
                  log.status && log.status >= 200 && log.status < 300
                    ? "bg-emerald-50/50 border-emerald-200"
                    : log.status === 404
                    ? "bg-amber-50/60 border-amber-300"
                    : "bg-red-50/50 border-red-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        log.method === "GET"
                          ? "bg-blue-100 text-blue-700"
                          : log.method === "POST"
                          ? "bg-emerald-100 text-emerald-700"
                          : log.method === "DELETE"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {log.method}
                    </span>
                    <span className="font-semibold text-slate-800">{log.url}</span>
                    {log.isTrap && (
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold text-[10px]">
                        BẪY 404
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {log.status ? (
                      <span
                        className={`flex items-center gap-1 font-bold ${
                          log.status < 300 ? "text-emerald-600" : log.status === 404 ? "text-amber-600" : "text-red-600"
                        }`}
                      >
                        {log.status < 300 ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {log.status} {log.statusText || ""}
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold">ERROR</span>
                    )}
                  </div>
                </div>

                {log.payload && (
                  <div className="mt-2">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Request Body:</span>
                    <pre className="mt-0.5 bg-slate-900 text-slate-200 p-2 rounded text-[11px] overflow-x-auto">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </div>
                )}

                {log.response && (
                  <div className="mt-2">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Response Data:</span>
                    <pre className="mt-0.5 bg-slate-900 text-emerald-400 p-2 rounded text-[11px] overflow-x-auto">
                      {JSON.stringify(log.response, null, 2)}
                    </pre>
                  </div>
                )}

                {log.error && (
                  <div className="mt-2">
                    <span className="text-[10px] text-red-600 uppercase font-semibold">Error Message:</span>
                    <pre className="mt-0.5 bg-red-950 text-red-200 p-2 rounded text-[11px] overflow-x-auto">
                      {log.error}
                    </pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
