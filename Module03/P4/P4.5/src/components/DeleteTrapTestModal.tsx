import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, Bug, Play, X } from "lucide-react";

interface DeleteTrapTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteDelete: (id: string) => Promise<any>;
}

export const DeleteTrapTestModal: React.FC<DeleteTrapTestModalProps> = ({
  isOpen,
  onClose,
  onExecuteDelete,
}) => {
  const [targetId, setTargetId] = useState("999999");
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: "success" | "trap_caught" | "error" | null;
    message: string;
    details?: any;
    httpStatus?: number;
  }>({ status: null, message: "" });

  if (!isOpen) return null;

  const runTrapTest = async () => {
    setIsRunning(true);
    setTestResult({ status: null, message: "" });
    try {
      const res = await onExecuteDelete(targetId.trim());
      setTestResult({
        status: "success",
        message: `Xóa thành công ID "${targetId}". Server phản hồi mã 200 OK.`,
        details: res,
        httpStatus: 200,
      });
    } catch (err: any) {
      if (err.isTrapCaught || err.status === 404 || err.response?.status === 404) {
        setTestResult({
          status: "trap_caught",
          message: `[Bẫy dữ liệu bắt thành công!] Mock server trả về mã HTTP 404 Not Found do ID "${targetId}" không tồn tại trong db.json. Ứng dụng không bị crash!`,
          details: {
            errorName: err.name || "AxiosError",
            httpStatus: 404,
            statusText: "Not Found",
            message: err.message,
            trapHandled: true,
          },
          httpStatus: 404,
        });
      } else {
        setTestResult({
          status: "error",
          message: err.message || "Lỗi mạng hoặc server không phản hồi!",
          details: err,
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Thử Nghiệm Bẫy Dữ Liệu: DELETE 404
              </h3>
              <p className="text-xs text-amber-700 font-medium">
                Kiểm chứng bẫy xóa ID không tồn tại trên json-server
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Quy tắc nghiệp vụ của bài toán:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>
                Nếu gửi <code className="bg-slate-200 px-1 py-0.5 rounded">DELETE /contacts/:id</code> với ID không có trong <code className="bg-slate-200 px-1 py-0.5 rounded">db.json</code>, mock server trả về status <span className="font-bold text-red-600">404</span>.
              </li>
              <li>
                Axios mặc định coi status &ge; 400 là reject và ném vào khối <code className="bg-slate-200 px-1 py-0.5 rounded">catch</code>.
              </li>
              <li>
                Bộ xử lý cần bắt mã 404, cô lập lỗi và thông báo trực tiếp lên giao diện, ngăn crash màn hình.
              </li>
            </ul>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              ID cần thử nghiệm xóa:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                placeholder="Nhập ID (VD: 999999 hoặc 999-not-found)"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setTargetId("999999")}
                className="px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Set 999999
              </button>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={runTrapTest}
            disabled={isRunning || !targetId.trim()}
            className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-medium rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>Bắn Request DELETE /{targetId}</span>
          </button>

          {/* Test Result Display */}
          {testResult.status && (
            <div
              className={`p-4 rounded-xl border text-sm space-y-2 animate-fade-in ${
                testResult.status === "trap_caught"
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : testResult.status === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : "bg-red-50 border-red-300 text-red-900"
              }`}
            >
              <div className="flex items-start gap-2">
                {testResult.status === "trap_caught" ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : testResult.status === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold">{testResult.message}</div>
                  {testResult.httpStatus && (
                    <div className="text-xs mt-1 font-mono font-bold">
                      HTTP Status Code: {testResult.httpStatus}
                    </div>
                  )}
                </div>
              </div>

              {testResult.details && (
                <div className="mt-2 pt-2 border-t border-amber-200/50">
                  <span className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Chi tiết phản hồi (Caught Object):
                  </span>
                  <pre className="text-xs bg-slate-900 text-emerald-400 p-2.5 rounded-lg overflow-x-auto font-mono">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
