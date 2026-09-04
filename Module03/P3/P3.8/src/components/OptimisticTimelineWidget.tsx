import React from 'react';
import type { DisputeLog } from '../types/dispute';
import { Terminal, Trash2, CheckCircle, RotateCcw, Zap, Clock } from 'lucide-react';

interface OptimisticTimelineWidgetProps {
  logs: DisputeLog[];
  onClearLogs: () => void;
}

export const OptimisticTimelineWidget: React.FC<OptimisticTimelineWidgetProps> = ({
  logs,
  onClearLogs,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Nhật Ký Sự Kiện Real-time & Timeline Rollback
          </h3>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa log</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
            0ms
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Độ trễ Optimistic</p>
            <p className="text-xs font-bold text-emerald-300">Phản hồi tức thì t=0.0s</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
            2.0s
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Độ trễ Server Giả lập</p>
            <p className="text-xs font-bold text-indigo-300">Xử lý backend ngầm</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center font-mono font-bold text-xs">
            500
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Phòng vệ onError</p>
            <p className="text-xs font-bold text-rose-300">Tự động khôi phục Cache</p>
          </div>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">
          Chưa có sự kiện nào. Hãy thử bấm "Đánh dấu Đã xử lý" trên bảng để ghi lại tiến trình.
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
          {logs.map((log) => {
            const isOptimistic = log.status === 'optimistic';
            const isRollback = log.status === 'rollback';
            const isSuccess = log.status === 'success';

            return (
              <div
                key={log.id}
                className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                  isRollback
                    ? 'bg-rose-950/30 border-rose-900/60 text-rose-200'
                    : isSuccess
                    ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                    : 'bg-cyan-950/20 border-cyan-900/40 text-cyan-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isRollback ? (
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                  ) : isSuccess ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-cyan-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded ${
                        isRollback
                          ? 'bg-rose-900/80 text-rose-300'
                          : isSuccess
                          ? 'bg-emerald-900/80 text-emerald-300'
                          : 'bg-cyan-900/80 text-cyan-300'
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300 break-words">
                    {log.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
