import React from "react";
import { ShieldCheck, X, Check, AlertTriangle, Clock, RefreshCw, Cpu, Layers } from "lucide-react";

interface ExceptionsMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExceptionsMatrixModal: React.FC<ExceptionsMatrixModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-indigo-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Ma Trận Kiểm Thử Ngoại Lệ (Exception Scenarios Matrix)
              </h3>
              <p className="text-xs text-indigo-700 font-medium">
                8 kịch bản lỗi mạng & nghiệp vụ đã được Module Resilient Client bao phủ trọn vẹn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans text-slate-700">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3.5 border-b">Mã / Kịch Bản</th>
                  <th className="p-3.5 border-b">Bối cảnh Sự cố (Problem)</th>
                  <th className="p-3.5 border-b text-indigo-700">Cơ chế Kháng Lỗi Của Module (Solution)</th>
                  <th className="p-3.5 border-b text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px]">
                      1. Dirty Params
                    </span>
                  </td>
                  <td className="p-3.5">
                    Truyền tham số rác: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">{`{ page: undefined, sort: null, invalid: NaN }`}</code>
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Hàm <code className="font-mono font-bold text-indigo-600">cleanParams()</code> tiền xử lý loại bỏ sạch các key vô giá trị trước khi gửi tới Axios.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[11px]">
                      2. HTTP 401
                    </span>
                  </td>
                  <td className="p-3.5">
                    Phiên đăng nhập hết hạn hoặc Access Token bị thu hồi trên Server.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Response Interceptor tự động bắt 401, dọn sạch session, gọi callback <code className="font-mono">onUnauthorized</code> và chuẩn hóa lỗi.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[11px]">
                      3. HTTP 403
                    </span>
                  </td>
                  <td className="p-3.5">
                    Tài khoản không đủ quyền truy cập (Forbidden role access).
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Định tuyến thông báo cấm quyền tập trung, ngăn chặn thao tác phá hoại dữ liệu.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-[11px]">
                      4. HTTP 500
                    </span>
                  </td>
                  <td className="p-3.5">
                    Máy chủ backend sập nguồn hoặc ném lỗi Exception cơ sở dữ liệu.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Bắt mã 500 tại Interceptor, đóng gói thông báo an toàn, kích hoạt <code className="font-mono">onServerError</code> và che giấu stacktrace nhạy cảm.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[11px]">
                      5. Timeout 5000ms
                    </span>
                  </td>
                  <td className="p-3.5">
                    Mạng treo hoặc API xử lý quá 5 giây gây đóng băng giao diện người dùng.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Cấu hình <code className="font-mono">timeout: 5000</code> ngắt luồng tự động khi chạm ngưỡng, giải phóng bộ nhớ trình duyệt.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px]">
                      6. Network Offline
                    </span>
                  </td>
                  <td className="p-3.5">
                    Mất kết nối Internet vật lý hoặc Gateway Backend không phản hồi.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Bắt lỗi <code className="font-mono">ERR_NETWORK</code>, thông báo người dùng kiểm tra lại đường truyền mạng.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-[11px]">
                      7. HTTP 404
                    </span>
                  </td>
                  <td className="p-3.5">
                    Tài nguyên không tìm thấy hoặc sai đường dẫn endpoint.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Trả về cấu trúc <code className="font-mono">ApiErrorResponse</code> chuẩn hóa chứa statusCode 404 cho UI render Empty State.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-[11px]">
                      8. Unwrap Metadata
                    </span>
                  </td>
                  <td className="p-3.5">
                    Code UI bị ô nhiễm bởi metadata Axios: <code className="font-mono">res.status, res.headers, res.config</code>.
                  </td>
                  <td className="p-3.5 font-medium text-indigo-900">
                    Response Interceptor tự bóc tách và trả về trực tiếp <code className="font-mono font-bold text-teal-700">response.data</code>, giúp code UI cực kỳ gọn gàng.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      COVERED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng Ma Trận
          </button>
        </div>
      </div>
    </div>
  );
};
