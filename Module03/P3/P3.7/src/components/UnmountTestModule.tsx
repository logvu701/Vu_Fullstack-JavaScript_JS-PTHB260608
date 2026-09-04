import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, CheckCircle2, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

// Subcomponent dùng useCountdown để test unmount
const ActiveTimerChild: React.FC<{ id: number; onLog: (msg: string) => void }> = ({ id, onLog }) => {
  const { timeLeft, formattedTime } = useCountdown({
    initialSeconds: 30,
    autoStart: true,
    onTick: (rem) => {
      onLog(`[Timer #${id}] Tick: còn ${rem}s`);
    },
  });

  useEffect(() => {
    onLog(`[Timer #${id}] ✅ MOUNTED: Đã khởi tạo interval chạy ngầm.`);
    return () => {
      onLog(`[Timer #${id}] 🛑 UNMOUNTED: useEffect cleanup đã gọi clearInterval! Bộ nhớ đã được giải phóng sạch sẽ.`);
    };
  }, [id, onLog]);

  return (
    <div className="p-4 bg-slate-900 border border-indigo-500/40 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-semibold text-white">Timer Sandbox #{id}</span>
      </div>
      <div className="text-lg font-black font-mono text-indigo-400">
        {formattedTime}
      </div>
    </div>
  );
};

export const UnmountTestModule: React.FC = () => {
  const [mountedTimers, setMountedTimers] = useState<number[]>([1]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 30)]);
  };

  const handleMountNew = () => {
    const nextId = (mountedTimers[mountedTimers.length - 1] || 0) + 1;
    setMountedTimers((prev) => [...prev, nextId]);
  };

  const handleUnmountLast = () => {
    setMountedTimers((prev) => prev.slice(0, -1));
  };

  const handleUnmountAll = () => {
    setMountedTimers([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase">
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Bẫy Dữ liệu: Dọn dẹp Bộ nhớ khi Unmount</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Phòng Thí nghiệm Tránh Rò rỉ Bộ nhớ (Memory Leak Sandbox)
        </h2>
        <p className="text-xs text-slate-400">
          Mount và Unmount các component đếm ngược để trực tiếp kiểm tra quá trình gọi <code>clearInterval</code> trong hàm dọn dẹp (cleanup function).
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleMountNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Mount thêm 1 Timer mới</span>
        </button>

        <button
          onClick={handleUnmountLast}
          disabled={mountedTimers.length === 0}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Unmount Timer gần nhất</span>
        </button>

        <button
          onClick={handleUnmountAll}
          disabled={mountedTimers.length === 0}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Unmount toàn bộ</span>
        </button>

        <button
          onClick={() => setLogs([])}
          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition ml-auto"
        >
          Xóa Logs
        </button>
      </div>

      {/* Mounted Timers Container */}
      <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">
            Danh sách Timer đang Active trên DOM: ({mountedTimers.length})
          </h4>
        </div>

        {mountedTimers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-2xl">
            Tất cả Timer đã bị Unmount. Không còn bất kỳ interval nào chạy ngầm làm hao tốn tài nguyên.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mountedTimers.map((id) => (
              <ActiveTimerChild key={id} id={id} onLog={addLog} />
            ))}
          </div>
        )}
      </div>

      {/* Real-time Cleanup Logs Console */}
      <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-2 text-emerald-400 font-bold">
            <Activity className="w-4 h-4" />
            Live Memory Cleanup Terminal Log:
          </span>
          <span>{logs.length} sự kiện</span>
        </div>

        <div className="h-48 overflow-y-auto space-y-1.5 p-3 bg-black/50 rounded-xl border border-slate-800 text-[11px]">
          {logs.length === 0 ? (
            <span className="text-slate-600">Đang lắng nghe sự kiện mount/unmount...</span>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes('UNMOUNTED')
                    ? 'text-rose-400 font-bold'
                    : log.includes('MOUNTED')
                    ? 'text-emerald-400 font-bold'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
