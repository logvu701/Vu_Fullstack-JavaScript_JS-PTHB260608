import React, { useEffect, useState } from 'react';
import { Activity, Clock, Database, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

interface CacheLifecycleVisualizerProps {
  isFetching: boolean;
  dataUpdatedAt: number;
  staleTimeMs: number;
}

export const CacheLifecycleVisualizer: React.FC<CacheLifecycleVisualizerProps> = ({
  isFetching,
  dataUpdatedAt,
  staleTimeMs,
}) => {
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (dataUpdatedAt) {
        setSecondsSinceUpdate(Math.floor((Date.now() - dataUpdatedAt) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dataUpdatedAt]);

  const staleTimeSec = staleTimeMs / 1000;
  const isFresh = secondsSinceUpdate < staleTimeSec && dataUpdatedAt > 0;
  const remainingFreshSec = Math.max(0, staleTimeSec - secondsSinceUpdate);

  // Xác định trạng thái vòng đời
  let currentStage: 'Fetching' | 'Fresh' | 'Stale' = 'Fetching';
  if (isFetching) {
    currentStage = 'Fetching';
  } else if (isFresh) {
    currentStage = 'Fresh';
  } else {
    currentStage = 'Stale';
  }

  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Database className="w-5 h-5" />
          <span>Real-time Cache Lifecycle State Monitor</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">staleTime:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">5 phút (300s)</span>
        </div>
      </div>

      {/* 4 Stages Status Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Stage 1: Fetching */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          currentStage === 'Fetching'
            ? 'bg-blue-950/80 border-blue-500 text-blue-300 ring-2 ring-blue-500/30'
            : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1">
            <span>1. Fetching</span>
            {currentStage === 'Fetching' && <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />}
          </div>
          <p className="text-[11px] leading-tight">Đang gọi API mạng</p>
        </div>

        {/* Stage 2: Fresh */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          currentStage === 'Fresh'
            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
            : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1">
            <span>2. Fresh (Tươi mới)</span>
            {currentStage === 'Fresh' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <p className="text-[11px] leading-tight">
            {isFresh ? `Còn tươi trong: ${remainingFreshSec}s` : 'Hết hạn fresh'}
          </p>
        </div>

        {/* Stage 3: Stale */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          currentStage === 'Stale'
            ? 'bg-amber-950/80 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
            : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1">
            <span>3. Stale (Cũ)</span>
            {currentStage === 'Stale' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
          </div>
          <p className="text-[11px] leading-tight">Sẵn sàng re-fetch ngầm khi mount lại</p>
        </div>

        {/* Stage 4: Inactive */}
        <div className="p-3.5 rounded-2xl border bg-slate-950 border-slate-800 text-slate-500 opacity-60">
          <div className="font-bold mb-1">4. Inactive</div>
          <p className="text-[11px] leading-tight">Khi component unmount (Lưu trong gcTime 10m)</p>
        </div>
      </div>
    </div>
  );
};
