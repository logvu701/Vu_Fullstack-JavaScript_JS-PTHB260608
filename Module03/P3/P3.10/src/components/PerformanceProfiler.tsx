import React from 'react';
import { Activity, Clock, RefreshCw, Zap, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { AnalyticsSummary } from '../types/student';

interface PerformanceProfilerProps {
  analytics: AnalyticsSummary;
  computationCount: number;
  renderCount: number;
  isOptimized: boolean;
  onResetCounts: () => void;
}

export const PerformanceProfiler: React.FC<PerformanceProfilerProps> = ({
  analytics,
  computationCount,
  renderCount,
  isOptimized,
  onResetCounts,
}) => {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <Activity className="w-5 h-5 animate-pulse" />
          <span>Real-Time Performance Profiler & Cache Monitor</span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            isOptimized
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
              : 'bg-rose-950 text-rose-300 border-rose-800'
          }`}>
            {isOptimized ? '⚡ useMemo & useCallback Active' : '⚠️ No Cache (Full Re-run)'}
          </span>

          <button
            onClick={onResetCounts}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
            title="Reset bộ đếm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Counters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Execution Time */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Thời gian tính toán mảng 5.000:</span>
          <div className="text-2xl font-black font-mono text-cyan-400">
            {analytics.executionTimeMs} <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-500">Lần chạy gần nhất: {analytics.computationTimestamp}</span>
        </div>

        {/* Metric 2: Heavy Computation Count */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Số lần duyệt vòng lặp 5.000:</span>
          <div className={`text-2xl font-black font-mono ${
            isOptimized ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {computationCount} <span className="text-xs font-normal text-slate-400">lần</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {isOptimized ? 'Bypass thành công khi click Audit' : 'Chạy lại toàn bộ mỗi lần render'}
          </span>
        </div>

        {/* Metric 3: Component Re-renders */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Số lần Component Re-render:</span>
          <div className="text-2xl font-black font-mono text-amber-400">
            {renderCount} <span className="text-xs font-normal text-slate-400">renders</span>
          </div>
          <span className="text-[10px] text-slate-500">Parent Component re-render trigger</span>
        </div>

        {/* Metric 4: Filtered Output */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Kết quả học viên phù hợp:</span>
          <div className="text-2xl font-black font-mono text-white">
            {analytics.totalCount} <span className="text-xs font-normal text-slate-400">/ 5.000</span>
          </div>
          <span className="text-[10px] text-slate-500">GPA TB: {analytics.averageGPA} • Top: {analytics.topRankCount}</span>
        </div>
      </div>
    </div>
  );
};
