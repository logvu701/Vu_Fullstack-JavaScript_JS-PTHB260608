import React from "react";
import { NetworkInspection } from "../types/crm";
import { ShieldCheck, ShieldAlert, Terminal, CheckCircle, XCircle } from "lucide-react";

interface NetworkHeaderInspectorProps {
  inspection: NetworkInspection | null;
}

export const NetworkHeaderInspector: React.FC<NetworkHeaderInspectorProps> = ({
  inspection,
}) => {
  if (!inspection) {
    return (
      <div className="bg-slate-900 text-slate-400 p-6 rounded-2xl border border-slate-800 text-center font-mono text-xs">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-500 mx-auto flex items-center justify-center mb-2">
          <Terminal className="w-5 h-5" />
        </div>
        <div>Chưa có yêu cầu API nào được kích hoạt.</div>
        <p className="text-slate-500 text-[11px] mt-1">
          Bấm "Tải Danh Sách Khách Hàng" hoặc "Tải Thống Kê Doanh Thu" để quan sát Interceptor tiêm Header!
        </p>
      </div>
    );
  }

  const hasAuth = Boolean(inspection.requestHeaders["Authorization"]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-slate-200 font-mono text-xs shadow-xl animate-fade-in">
      {/* DevTools Title Bar */}
      <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="text-slate-300 font-sans font-semibold text-xs">
            Trình Giám Sát Request Headers Thời Gian Thực (Axios Interceptor Inspector)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-[11px]">
            {inspection.method}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
              inspection.status === 200
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            }`}
          >
            {inspection.status === 200 ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {inspection.status} {inspection.statusText}
          </span>
        </div>
      </div>

      {/* Header Inspection Content */}
      <div className="p-5 space-y-4">
        <div>
          <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1">
            General Information:
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-[11px]">
            <div>
              <span className="text-slate-500">Request URL: </span>
              <span className="text-slate-200">{inspection.url}</span>
            </div>
            <div>
              <span className="text-slate-500">Request Method: </span>
              <span className="text-emerald-400 font-bold">{inspection.method}</span>
            </div>
            <div>
              <span className="text-slate-500">Timestamp: </span>
              <span className="text-slate-400">
                {new Date(inspection.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Request Headers Section */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">
              Request Headers (Được tiêm bởi Interceptor):
            </span>
            {hasAuth ? (
              <span className="text-emerald-400 text-[11px] font-sans font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Đã tiêm Bearer Token thành công
              </span>
            ) : (
              <span className="text-rose-400 text-[11px] font-sans font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Bỏ qua gán Header (Chưa đăng nhập)
              </span>
            )}
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            {/* Authorization Header Highlight */}
            {hasAuth ? (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
                <div className="text-emerald-400 font-bold text-xs">Authorization:</div>
                <div className="text-emerald-200 break-all text-[11px] mt-0.5">
                  {inspection.requestHeaders["Authorization"]}
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg text-rose-300 text-[11px]">
                <div className="font-bold text-rose-400">Authorization: [KHÔNG CÓ / OMITTED]</div>
                <div className="text-[10px] text-rose-300 mt-0.5">
                  (Bẫy dữ liệu an toàn: Interceptor không gửi chuỗi "Bearer null" hay "Bearer undefined", giúp Server trả về đúng mã lỗi 401 Unauthorized thay vì crash ứng dụng).
                </div>
              </div>
            )}

            {/* Other standard headers */}
            {Object.entries(inspection.requestHeaders)
              .filter(([k]) => k !== "Authorization")
              .map(([key, val]) => (
                <div key={key} className="text-[11px]">
                  <span className="text-slate-400">{key}: </span>
                  <span className="text-slate-300">{val}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Server Response Summary */}
        {inspection.error && (
          <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs">
            <span className="font-bold text-red-400">Máy chủ từ chối: </span>
            <span>{inspection.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
