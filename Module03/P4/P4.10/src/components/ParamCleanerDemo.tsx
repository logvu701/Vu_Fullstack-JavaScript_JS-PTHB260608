import React, { useState } from "react";
import { cleanParams } from "../api/client";
import { Sparkles, Trash2, CheckCircle2, ArrowRight } from "lucide-react";

export const ParamCleanerDemo: React.FC = () => {
  const [sampleKey, setSampleKey] = useState("custom_tag");
  const [sampleVal, setSampleVal] = useState("undefined");

  // Sample dirty params state
  const [dirtyParams, setDirtyParams] = useState<Record<string, any>>({
    search: "bàn phím cơ",
    page: undefined,
    filter: null,
    sort: "",
    invalidScore: NaN,
    limit: 20,
    category: "  Gaming Gear  ",
  });

  const sanitized = cleanParams(dirtyParams);

  // Convert to URL query string to show real impact
  const rawQueryString = Object.entries(dirtyParams)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");

  const sanitizedQueryString = Object.entries(sanitized)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");

  const loadPresetDirty = () => {
    setDirtyParams({
      search: "tai nghe bluetooth",
      page: undefined,
      filter: null,
      sort: "",
      invalidNumber: NaN,
      limit: 50,
      active: true,
      whitespaceKey: "    ",
    });
  };

  const loadCleanPreset = () => {
    setDirtyParams({
      search: "macbook m3",
      page: 1,
      limit: 10,
      category: "laptop",
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Kiểm Nghiệm Bộ Tiền Xử Lý cleanParams() (Bẫy Dữ Liệu Params Rác)
            </h3>
            <p className="text-xs text-slate-500">
              Tự động khử sạch undefined, null, "", NaN và cắt tỉa khoảng trắng trước khi đẩy qua Axios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadPresetDirty}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Nạp Params Rác Mẫu
          </button>
          <button
            onClick={loadCleanPreset}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Nạp Params Sạch
          </button>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Left: Raw Dirty Params */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-700 font-sans flex items-center gap-1">
              <span>Params Gốc Truyền Vào (Chứa Rác)</span>
            </span>
            <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-mono">
              {Object.keys(dirtyParams).length} thuộc tính
            </span>
          </div>
          <pre className="bg-slate-900 text-rose-300 p-4 rounded-2xl overflow-x-auto max-h-56">
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(dirtyParams).map(([k, v]) => [
                  k,
                  v === undefined
                    ? "[UNDEFINED]"
                    : Number.isNaN(v)
                    ? "[NaN]"
                    : v,
                ])
              ),
              null,
              2
            )}
          </pre>
          <div className="text-[11px] text-slate-500 font-sans">
            URL nếu không xử lý (Bị lỗi Backend):
            <div className="font-mono text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 break-all mt-1">
              ?{rawQueryString}
            </div>
          </div>
        </div>

        {/* Right: Sanitized Params */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-700 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Params Đã Tiền Xử Lý (Sau cleanParams)</span>
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">
              {Object.keys(sanitized).length} thuộc tính hợp lệ
            </span>
          </div>
          <pre className="bg-slate-900 text-emerald-300 p-4 rounded-2xl overflow-x-auto max-h-56">
            {JSON.stringify(sanitized, null, 2)}
          </pre>
          <div className="text-[11px] text-slate-500 font-sans">
            URL chuẩn sạch sẽ gửi đến máy chủ:
            <div className="font-mono text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200 break-all mt-1 font-semibold">
              ?{sanitizedQueryString || "[Trống - Không có query params]"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
