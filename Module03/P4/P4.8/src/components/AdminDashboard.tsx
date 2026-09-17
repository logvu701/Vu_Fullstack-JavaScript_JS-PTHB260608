import React, { useState } from "react";
import { simulateApiCall } from "../api/authService";
import { ErrorEventLog } from "../types/errorTypes";
import {
  Server,
  Activity,
  Layers,
  Terminal,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  Cpu,
  ShieldAlert,
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
  onOpenComparison: () => void;
  logs: ErrorEventLog[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onOpenComparison,
  logs,
}) => {
  const [activeTab, setActiveTab] = useState<"system" | "logs">("system");
  const [apiResult, setApiResult] = useState<any>(null);
  const [loadingScenario, setLoadingScenario] = useState<string | null>(null);

  const runScenario = async (
    scenario: "200" | "401" | "403" | "500" | "network_error"
  ) => {
    setLoadingScenario(scenario);
    setApiResult(null);
    try {
      const res = await simulateApiCall(scenario);
      setApiResult({ status: 200, data: res.data });
    } catch (err: any) {
      setApiResult({
        status: err.response?.status || "ERROR",
        message: err.message,
      });
    } finally {
      setLoadingScenario(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Phiên Hoạt Động</div>
            <div className="text-lg font-bold text-slate-900 font-mono">1,420 users</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Gateway Uptime</div>
            <div className="text-lg font-bold text-slate-900 font-mono">99.98%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Tải CPU Máy Chủ</div>
            <div className="text-lg font-bold text-slate-900 font-mono">18.4%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Interceptor Trạm Gác</div>
            <div className="text-xs font-bold text-emerald-600 font-mono">ACTIVE (GLOBAL)</div>
          </div>
        </div>
      </div>

      {/* Scenario Test Bench */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Trạm Thử Nghiệm Kiểm Soát Phản Hồi (Response Interceptor Test Bench)
            </h3>
            <p className="text-xs text-slate-500">
              Kích hoạt các lỗi hệ thống để quan sát trạm kiểm soát Interceptor bắt lỗi và hành động
            </p>
          </div>
          <button
            onClick={onOpenComparison}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Xem Bảng So Sánh Đa Giải Pháp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {/* 200 OK */}
          <button
            onClick={() => runScenario("200")}
            disabled={loadingScenario !== null}
            className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-left transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-800">1. Gọi API 200 OK</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-emerald-700 leading-tight">
              Yêu cầu hợp lệ, trả về dữ liệu bình thường qua Interceptor.
            </p>
          </button>

          {/* 401 Unauthorized */}
          <button
            onClick={() => runScenario("401")}
            disabled={loadingScenario !== null}
            className="p-3.5 rounded-2xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                <span>2. Bẫy Lỗi 401</span>
                <span className="bg-rose-200 text-rose-900 px-1 rounded text-[10px]">Cốt lõi</span>
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-[11px] text-rose-700 leading-tight">
              Phiên hết hạn. Interceptor bắt 401 và <strong>tự động chuyển hướng về Login</strong>!
            </p>
          </button>

          {/* 403 Forbidden */}
          <button
            onClick={() => runScenario("403")}
            disabled={loadingScenario !== null}
            className="p-3.5 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-left transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-800">3. Lỗi 403 Cấm Quyền</span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-[11px] text-amber-700 leading-tight">
              Tài khoản không đủ quyền hạn, Interceptor chặn cảnh báo.
            </p>
          </button>

          {/* 500 Server Error */}
          <button
            onClick={() => runScenario("500")}
            disabled={loadingScenario !== null}
            className="p-3.5 rounded-2xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-left transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-800">4. Lỗi 500 Crash</span>
              <XCircle className="w-4 h-4 text-slate-600" />
            </div>
            <p className="text-[11px] text-slate-600 leading-tight">
              Máy chủ sập nguồn, Interceptor ghi nhận log toàn cục.
            </p>
          </button>
        </div>

        {/* Result snapshot if any */}
        {apiResult && (
          <div className="mt-3 p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto space-y-1">
            <div className="text-slate-400 text-[11px]">Server Response Payload:</div>
            <pre className="text-emerald-400">{JSON.stringify(apiResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Global Event Logs Terminal */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-slate-200 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-rose-400" />
            <h4 className="text-sm font-bold font-mono">
              Nhật Ký Sự Kiện Interceptor Toàn Cục (Intercepted Events Audit)
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {logs.length} sự kiện được ghi nhận
          </span>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              Chưa có lỗi nào được kích hoạt. Hãy bấm các nút bên trên để thử nghiệm bẫy phản hồi!
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 401
                          ? "bg-rose-900 text-rose-300"
                          : log.status === 403
                          ? "bg-amber-900 text-amber-300"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      HTTP {log.status} {log.statusText}
                    </span>
                    <span className="text-slate-300">{log.endpoint}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-slate-500">Thông báo: </span>
                  {log.message}
                </div>

                <div className="text-emerald-400 text-[11px]">
                  <span className="text-slate-500">Hành động toàn cục: </span>
                  {log.actionTaken}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
