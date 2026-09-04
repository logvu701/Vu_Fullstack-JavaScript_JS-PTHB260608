import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, MousePointerClick, AlertCircle } from 'lucide-react';

interface AuditHeaderPanelProps {
  isAuditedAll: boolean;
  onToggleAuditAll: () => void;
  independentClickCount: number;
  onIncrementIndependentCount: () => void;
  isOptimized: boolean;
}

/**
 * BẪY DỮ LIỆU BÀI 10:
 * Nút độc lập "Đã kiểm tra" (Audit Status) và Nút Click Độc lập.
 * Khi click vào các nút này, state của Parent Component sẽ thay đổi -> kích hoạt re-render.
 * - Khi useMemo BẬT: Tiến trình tính toán lại 5.000 phần tử ĐƯỢC BYPASS HOÀN TOÀN (0 lần recalculate!).
 * - Khi useMemo TẮT: Hàm tính toán 5.000 phần tử BỊ CHẠY LẠI MỖI LẦN CLICK!
 */
export const AuditHeaderPanel: React.FC<AuditHeaderPanelProps> = ({
  isAuditedAll,
  onToggleAuditAll,
  independentClickCount,
  onIncrementIndependentCount,
  isOptimized,
}) => {
  return (
    <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-md space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-sm text-white">
              Bẫy Dữ liệu: Thao tác Độc lập Không Tính toán lại (Independent State Guard)
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Click các nút bên phải để thay đổi state độc lập. Hãy quan sát <strong>"Số lần duyệt vòng lặp 5.000"</strong> ở bảng trên.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Nút Độc Lập 1: Toggle Audit Status */}
          <button
            onClick={onToggleAuditAll}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
              isAuditedAll
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isAuditedAll ? 'Đã kiểm tra: BẬT (Checked)' : 'Đã kiểm tra: TẮT'}</span>
          </button>

          {/* Nút Độc Lập 2: Independent Click Counter */}
          <button
            onClick={onIncrementIndependentCount}
            className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <MousePointerClick className="w-4 h-4" />
            <span>Click Test Re-render ({independentClickCount})</span>
          </button>
        </div>
      </div>

      {/* Proof badge */}
      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          {isOptimized ? (
            <span>
              ✅ <strong>Strict Equality Dependencies</strong>: Khi bấm nút này, dependencies của <code>useMemo</code> không đổi ➔ React lấy trực tiếp mảng 5.000 từ cache mà không tốn CPU!
            </span>
          ) : (
            <span className="text-rose-300">
              ❌ <strong>Không dùng useMemo</strong>: Mỗi lần bấm nút này, toàn bộ 5.000 phần tử lại bị duyệt và tính toán lại từ đầu!
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
