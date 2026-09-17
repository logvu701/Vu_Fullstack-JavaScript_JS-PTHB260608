import React from "react";
import { ExecutionLog } from "../types/user";
import { Terminal, AlertTriangle, CheckCircle, Flame } from "lucide-react";

interface PayloadInspectorProps {
  lastLog: ExecutionLog | null;
}

export const PayloadInspector: React.FC<PayloadInspectorProps> = ({ lastLog }) => {
  if (!lastLog) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Terminal className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-800">Trình Phân Tích I/O Chưa Có Dữ Liệu</h4>
        <p className="text-xs text-slate-500 mt-1">
          Hãy chọn một thao tác bên trên (PATCH hoặc PUT) để xem cấu trúc Request/Response trực quan!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
              lastLog.method === "PUT"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {lastLog.method}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">
                Kết Quả Thao Tác Gần Nhất
              </span>
              <span className="text-[11px] font-mono text-slate-500">{lastLog.url}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Thời gian thực thi: {new Date(lastLog.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {lastLog.dataLossWarning ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">
            <Flame className="w-4 h-4" />
            <span>DATA LOSS DETECTED!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span>Thao Tác Hợp Lệ</span>
          </div>
        )}
      </div>

      {/* Explanation Banner */}
      <div
        className={`px-6 py-3 text-xs leading-relaxed border-b ${
          lastLog.dataLossWarning
            ? "bg-red-50/80 border-red-200 text-red-900 font-medium"
            : "bg-emerald-50/80 border-emerald-200 text-emerald-900 font-medium"
        }`}
      >
        {lastLog.explanation}
      </div>

      {/* Side-by-side JSON view */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-6 gap-6">
        {/* Left: Input Payload */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <span>Input: Request Body (Payload)</span>
            </span>
            <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {Object.keys(lastLog.payload).length} trường gửi đi
            </span>
          </div>
          <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80">
            {JSON.stringify(lastLog.payload, null, 2)}
          </pre>
        </div>

        {/* Right: Output Server Database State */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <span>Output: Server State (Sau khi cập nhật)</span>
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                lastLog.dataLossWarning
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {Object.keys(lastLog.response).length} trường còn lại trên Server
            </span>
          </div>
          <pre
            className={`p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-80 ${
              lastLog.dataLossWarning
                ? "bg-slate-900 text-red-300 border border-red-500/30"
                : "bg-slate-900 text-emerald-300"
            }`}
          >
            {JSON.stringify(lastLog.response, null, 2)}
          </pre>
        </div>
      </div>

      {lastLog.lostFields && lastLog.lostFields.length > 0 && (
        <div className="px-6 pb-6 pt-0">
          <div className="p-3 bg-red-100/70 border border-red-200 rounded-xl text-xs text-red-800">
            <span className="font-bold">Danh sách các trường đã bị Server xóa sạch: </span>
            <span className="font-mono">{lastLog.lostFields.join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  );
};
