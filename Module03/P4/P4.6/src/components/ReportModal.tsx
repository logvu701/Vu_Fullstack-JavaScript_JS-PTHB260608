import React from "react";
import { FileText, X, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Database } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-indigo-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Báo Cáo Phân Tích Kỹ Thuật (I/O): PUT vs PATCH
              </h3>
              <p className="text-xs text-indigo-700 font-medium">
                Bản chất Idempotency, Payload và Rủi ro Bẫy Nghiệp vụ (RFC 7231 vs RFC 5789)
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
          {/* Comparison Matrix Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              1. Bảng Ma Trận So Sánh Kỹ Thuật
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-slate-100 font-semibold text-slate-800">
                  <tr>
                    <th className="p-3 border-b">Tiêu chí</th>
                    <th className="p-3 border-b text-indigo-700">PUT (RFC 7231)</th>
                    <th className="p-3 border-b text-emerald-700">PATCH (RFC 5789)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-800">Hành vi cốt lõi</td>
                    <td className="p-3">Ghi đè thay thế toàn bộ (Full Replacement)</td>
                    <td className="p-3">Cập nhật từng phần chỉ định (Partial Update)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">Tính Lũy đẳng (Idempotency)</td>
                    <td className="p-3 text-indigo-600 font-bold">CÓ (f(f(x)) = f(x))</td>
                    <td className="p-3 text-amber-600 font-semibold">KHÔNG BẮT BUỘC (Tùy logic)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-800">Kích thước Payload</td>
                    <td className="p-3">Nặng (phải gửi toàn bộ 10 trường)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Nhẹ (chỉ gửi trường thay đổi)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">Hậu quả khi thiếu trường</td>
                    <td className="p-3 text-red-600 font-bold">MẤT DỮ LIỆU (Data Loss vĩnh viễn)</td>
                    <td className="p-3 text-emerald-600 font-bold">AN TOÀN (Bảo toàn các trường cũ)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Trap Analysis */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-red-800 font-bold">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>2. Bẫy Nghiệp Vụ: Tại sao không dùng PUT để đổi 1 trường?</span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              Theo định nghĩa RFC 7231, một lệnh <code className="font-mono bg-red-100 px-1 py-0.5 rounded">PUT</code> đại diện cho toàn bộ trạng thái mới của đối tượng. Khi bạn gửi <code className="font-mono bg-red-100 px-1 py-0.5 rounded">{`{ phone: "0988776655" }`}</code> qua phương thức <code className="font-mono font-bold">PUT</code>, máy chủ RESTful tiêu chuẩn sẽ hiểu rằng bạn muốn bản ghi này <strong>CHỈ CÒN DUY NHẤT TRƯỜNG PHONE</strong>. Kết quả: Tên, Email, Chức vụ, Mức lương, Phòng ban đều bị xóa sạch khỏi Database!
            </p>
          </div>

          {/* I/O Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
              3. Phân tích Dữ liệu I/O (Input / Output)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2">
                <div className="text-emerald-400 font-bold font-sans flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  PATCH: An Toàn & Tối Ưu
                </div>
                <div className="text-slate-400 text-[11px] font-sans">Input Request Body:</div>
                <pre className="bg-slate-800 p-2 rounded text-emerald-300">
{`{
  "phone": "0988776655"
}`}
                </pre>
                <div className="text-slate-400 text-[11px] font-sans">Output Server State:</div>
                <div className="text-slate-300 font-sans text-[11px]">
                  Cập nhật SĐT mới, giữ nguyên 9 trường còn lại.
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2">
                <div className="text-red-400 font-bold font-sans flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  PUT (Thiếu trường): Nguy Hiểm!
                </div>
                <div className="text-slate-400 text-[11px] font-sans">Input Request Body:</div>
                <pre className="bg-slate-800 p-2 rounded text-red-300">
{`{
  "phone": "0988776655"
}`}
                </pre>
                <div className="text-slate-400 text-[11px] font-sans">Output Server State:</div>
                <div className="text-red-300 font-sans text-[11px]">
                  Toàn bộ 9 trường bị xóa (fullName = null, salary = null...)
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>4. Khuyến nghị Thực tế trong Doanh Nghiệp</span>
            </div>
            <ul className="list-disc list-inside text-xs text-emerald-700 space-y-1">
              <li>Sử dụng <strong>PATCH</strong> cho các hành động người dùng tương tác nhỏ (đổi avatar, toggle trạng thái, sửa 1 ô input inline).</li>
              <li>Sử dụng <strong>PUT</strong> khi người dùng submit một biểu mẫu chỉnh sửa hoàn chỉnh có đầy đủ mọi trường dữ liệu.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
};
