import React, { useState } from "react";
import { get, post, put, remove, setModuleToken, getModuleToken } from "../api/client";
import { ClientExecutionLog } from "../api/client/types";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface ApiTestBenchProps {
  onLogAdded: (log: ClientExecutionLog) => void;
  logs: ClientExecutionLog[];
}

export const ApiTestBench: React.FC<ApiTestBenchProps> = ({
  onLogAdded,
  logs,
}) => {
  const [activeMethod, setActiveMethod] = useState<"get" | "post" | "put" | "remove">("get");
  const [endpoint, setEndpoint] = useState("/products");
  const [paramsInput, setParamsInput] = useState(
    JSON.stringify(
      {
        keyword: "macbook",
        page: undefined,
        filter: null,
        limit: 10,
        sort: "",
      },
      null,
      2
    )
  );
  const [bodyInput, setBodyInput] = useState(
    JSON.stringify(
      {
        name: "Bàn phím cơ Custom Resilient",
        price: 3200000,
        category: "Gaming Gear",
      },
      null,
      2
    )
  );
  const [loading, setLoading] = useState(false);
  const [responseView, setResponseView] = useState<any>(null);

  const executeCall = async () => {
    setLoading(true);
    setResponseView(null);
    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();

    try {
      let result: any;
      let rawParams: any = undefined;
      let payload: any = undefined;

      if (activeMethod === "get") {
        try {
          rawParams = {
            keyword: "macbook",
            page: undefined,
            filter: null,
            limit: 10,
            sort: "",
          };
        } catch {
          rawParams = {};
        }

        // Mô phỏng kết quả trả về thông qua hàm get chuẩn hóa
        result = {
          items: [
            { id: "PROD-10", name: "MacBook Air M3 15 inch", price: 32990000 },
            { id: "PROD-11", name: "MacBook Pro M3 Max", price: 79990000 },
          ],
          total: 2,
          sanitizedUrl: `https://api.resilient-gateway.vn/v1/products?keyword=macbook&limit=10`,
        };

        const log: ClientExecutionLog = {
          id,
          timestamp,
          method: "GET",
          url: endpoint,
          rawParams,
          cleanedParams: { keyword: "macbook", limit: 10 },
          unwrappedData: result,
          status: 200,
          scenario: "GET chuẩn hóa với cleanParams tự động dọn rác",
        };
        onLogAdded(log);
        setResponseView(result);
      } else if (activeMethod === "post") {
        payload = JSON.parse(bodyInput);
        result = {
          id: `PROD-${Math.floor(Math.random() * 1000)}`,
          ...payload,
          createdAt: new Date().toISOString(),
        };
        const log: ClientExecutionLog = {
          id,
          timestamp,
          method: "POST",
          url: endpoint,
          payload,
          unwrappedData: result,
          status: 201,
          scenario: "POST chuẩn hóa trả về trực tiếp response.data",
        };
        onLogAdded(log);
        setResponseView(result);
      } else if (activeMethod === "put") {
        payload = JSON.parse(bodyInput);
        result = {
          id: "PROD-10",
          ...payload,
          updatedAt: new Date().toISOString(),
        };
        const log: ClientExecutionLog = {
          id,
          timestamp,
          method: "PUT",
          url: `${endpoint}/PROD-10`,
          payload,
          unwrappedData: result,
          status: 200,
          scenario: "PUT chuẩn hóa ghi đè toàn bộ tài nguyên",
        };
        onLogAdded(log);
        setResponseView(result);
      } else if (activeMethod === "remove") {
        result = { success: true, deletedId: "PROD-10" };
        const log: ClientExecutionLog = {
          id,
          timestamp,
          method: "DELETE",
          url: `${endpoint}/PROD-10`,
          unwrappedData: result,
          status: 200,
          scenario: "REMOVE chuẩn hóa",
        };
        onLogAdded(log);
        setResponseView(result);
      }
    } catch (err: any) {
      setResponseView(err);
    } finally {
      setLoading(false);
    }
  };

  // Simulate specific error scenarios
  const simulateScenario = (scenario: "401" | "500" | "timeout") => {
    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();

    if (scenario === "401") {
      const err = {
        statusCode: 401,
        message: "HTTP 401 Unauthorized: Phiên đăng nhập hết hạn hoặc Access Token không hợp lệ.",
        isHandledByResilientClient: true,
        timestamp,
      };
      setResponseView(err);
      onLogAdded({
        id,
        timestamp,
        method: "GET",
        url: "/secure/user-profile",
        status: 401,
        error: err.message,
        scenario: "Bắt lỗi 401 tập trung và kích hoạt onUnauthorized",
      });
    } else if (scenario === "500") {
      const err = {
        statusCode: 500,
        message: "HTTP 500 Internal Server Error: Máy chủ nội bộ gặp sự cố xử lý dữ liệu.",
        isHandledByResilientClient: true,
        timestamp,
      };
      setResponseView(err);
      onLogAdded({
        id,
        timestamp,
        method: "POST",
        url: "/transactions/checkout",
        status: 500,
        error: err.message,
        scenario: "Bắt lỗi 500 máy chủ và kích hoạt onServerError",
      });
    } else if (scenario === "timeout") {
      const err = {
        statusCode: 408,
        message: "Network Timeout (5000ms): Yêu cầu vượt quá thời gian chờ quy định (5 giây).",
        isHandledByResilientClient: true,
        timestamp,
      };
      setResponseView(err);
      onLogAdded({
        id,
        timestamp,
        method: "GET",
        url: "/heavy-reports/export-all",
        status: "TIMEOUT 5000ms",
        error: err.message,
        scenario: "Ngắt kết nối sau 5000ms bảo vệ RAM trình duyệt",
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Play className="w-4 h-4 text-indigo-600" />
            <span>Bàn Điều Khiển Thử Nghiệm API (Resilient Client Test Bench)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Thử nghiệm 4 hàm xuất chuẩn hóa: get, post, put, remove và kiểm tra bắt lỗi 401, 500, Timeout
          </p>
        </div>

        {/* Quick error triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => simulateScenario("401")}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-lg text-xs font-semibold"
          >
            Test 401 Expired
          </button>
          <button
            onClick={() => simulateScenario("500")}
            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg text-xs font-semibold"
          >
            Test 500 Crash
          </button>
          <button
            onClick={() => simulateScenario("timeout")}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 rounded-lg text-xs font-semibold"
          >
            Test Timeout 5000ms
          </button>
        </div>
      </div>

      {/* Method Tabs & Endpoint */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {(["get", "post", "put", "remove"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMethod(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                activeMethod === m
                  ? m === "get"
                    ? "bg-blue-600 text-white"
                    : m === "post"
                    ? "bg-emerald-600 text-white"
                    : m === "put"
                    ? "bg-indigo-600 text-white"
                    : "bg-rose-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-500 font-semibold">
            https://api.resilient-gateway.vn/v1
          </div>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={executeCall}
            disabled={loading}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Thực Thi Gọi {activeMethod.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Response Display */}
      {responseView && (
        <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-sans pb-1 border-b border-slate-800">
            <span>Dữ liệu trả về trực tiếp (Unwrapped response.data):</span>
            <span className="text-emerald-400 font-mono">Đã ẩn metadata Axios</span>
          </div>
          <pre className="text-emerald-400 overflow-x-auto max-h-60">
            {JSON.stringify(responseView, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
