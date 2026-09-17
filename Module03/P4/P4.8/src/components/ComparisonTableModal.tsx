import React from "react";
import { Table, X, Check, AlertCircle, ShieldAlert, Sparkles, Layers } from "lucide-react";

interface ComparisonTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonTableModal: React.FC<ComparisonTableModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Bảng So Sánh Đa Giải Pháp: Global Error Handling
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                Xử lý mã 401 tại Interceptor Tập Trung vs Khối Catch Phân Tán ở từng hàm API
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Comparison Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-slate-100 font-bold text-slate-800">
                <tr>
                  <th className="p-3.5 border-b">Tiêu chí Đánh giá</th>
                  <th className="p-3.5 border-b text-emerald-800 bg-emerald-50/70">
                    Giải pháp 1: Response Interceptor (Tập Trung)
                  </th>
                  <th className="p-3.5 border-b text-rose-800 bg-rose-50/70">
                    Giải pháp 2: Catch ở từng API (Phân Tán)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Tính lặp lại mã (DRY)</td>
                  <td className="p-3.5 text-emerald-700 bg-emerald-50/20 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      Viết 1 lần duy nhất tại cấu hình Axios. Tự động áp dụng cho 100% API.
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/20">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Lặp lại khối check 401 ở hàng trăm hàm/component trong dự án.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Độ dễ bảo trì (Maintainability)</td>
                  <td className="p-3.5 text-emerald-700 bg-emerald-50/20 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      Cực kỳ cao. Thay đổi trang đăng nhập hoặc logic Token chỉ sửa đúng 1 tệp.
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/20">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Cực kỳ tốn kém. Phải tìm và sửa hàng chục tệp component, rất dễ bỏ sót.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Tính nhất quán UX (UX Consistency)</td>
                  <td className="p-3.5 text-emerald-700 bg-emerald-50/20 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      100% đồng nhất. Dù lỗi xảy ra ở bất kỳ đâu cũng tự động logout & chuyển hướng sạch.
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/20">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Dễ xảy ra hiện tượng "màn hình trắng" hoặc spinner quay vô tận nếu lập trình viên quên catch.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Tách biệt mối bận tâm (Separation of Concerns)</td>
                  <td className="p-3.5 text-emerald-700 bg-emerald-50/20 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      UI hoàn toàn tách biệt khỏi logic điều hướng hạ tầng và quản lý token.
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/20">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Trộn lẫn logic trình bày giao diện với việc xóa token và gọi navigate.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Mở rộng làm mới Token ngầm (Silent Refresh)</td>
                  <td className="p-3.5 text-emerald-700 bg-emerald-50/20 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      Rất dễ dàng tích hợp Refresh Token Queue và tự động gửi lại request ban đầu.
                    </span>
                  </td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/20">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      Gần như bất khả thi nếu triển khai ở từng khối catch cục bộ.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Code comparison snippets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2">
              <div className="text-emerald-400 font-sans font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Chuẩn: Interceptor Tập Trung (axiosClient.ts)
              </div>
              <pre className="text-emerald-300 text-[11px] overflow-x-auto p-2 bg-slate-800 rounded">
{`axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authStore.clearToken();
      toast.error("Hết hạn phiên!");
      navigate("/login");
    }
    return Promise.reject(err);
  }
);`}
              </pre>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2">
              <div className="text-rose-400 font-sans font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Phản mẫu: Bắt Lỗi Phân Tán (ComponentA, B, C...)
              </div>
              <pre className="text-rose-300 text-[11px] overflow-x-auto p-2 bg-slate-800 rounded">
{`// Ở hàng trăm nơi khác nhau:
try {
  await getOrders();
} catch (err) {
  if (err.response?.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng Bảng So Sánh
          </button>
        </div>
      </div>
    </div>
  );
};
