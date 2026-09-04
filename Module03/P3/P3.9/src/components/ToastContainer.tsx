import React from 'react';
import { useBoundStore } from '../store/useBoundStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBoundStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-start gap-3 animate-in slide-in-from-top-2 duration-300 ${
              isError
                ? 'bg-rose-950/95 border-rose-800 text-rose-100'
                : isSuccess
                ? 'bg-emerald-950/95 border-emerald-800 text-emerald-100'
                : isWarning
                ? 'bg-amber-950/95 border-amber-800 text-amber-100'
                : 'bg-indigo-950/95 border-indigo-800 text-indigo-100'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isError && !isSuccess && !isWarning && <Info className="w-5 h-5 text-indigo-400" />}
            </div>

            <div className="flex-1 text-xs font-medium leading-relaxed">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
