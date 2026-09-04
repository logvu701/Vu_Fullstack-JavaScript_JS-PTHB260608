import React from 'react';
import { Terminal, Clock, Sparkles } from 'lucide-react';
import type { CartState } from '../types/cart';

interface ActionHistoryLogProps {
  logs: CartState['actionLog'];
}

export const ActionHistoryLog: React.FC<ActionHistoryLogProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between text-slate-300">
        <h4 className="font-bold text-sm flex items-center gap-2 text-orange-400">
          <Terminal className="w-4 h-4" />
          Nhật ký Hoạt động useReducer (State Transition Logs)
        </h4>
        <span className="text-[11px] text-slate-500 font-mono">Pure Reducer Timeline</span>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs font-mono"
          >
            <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">{log.timestamp}</span>
            <div className="space-y-0.5 min-w-0">
              <span
                className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                  log.actionType.includes('REJECTED') || log.actionType.includes('FAILED')
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : log.actionType.includes('ADD')
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : log.actionType.includes('COUPON')
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {log.actionType}
              </span>
              <p className="text-slate-300 text-[11px] truncate pt-0.5">{log.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
