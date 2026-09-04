import React from 'react';
import { Database, Clock, RefreshCw, Zap, ShieldCheck, X } from 'lucide-react';

interface CacheDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CacheDocModal: React.FC<CacheDocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Báo cáo Phân tích: Vòng đời Cache trong TanStack Query
            </h3>
            <p className="text-xs text-slate-400">
              Kiến trúc StaleTime, Garbage Collection (gcTime) & Xử lý Nút Force Refresh
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              1. Bốn trạng thái Vòng đời của Cache
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-blue-400">1. Fetching:</strong> Dữ liệu đang được tải qua mạng (Network Request). Component hiển thị Spinner lần đầu.
              </li>
              <li className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-emerald-400">2. Fresh (Tươi mới):</strong> Dữ liệu vừa lấy về và còn trong khoảng <code>staleTime: 5 * 60 * 1000</code>. Chuyển tab trong 5 phút này sẽ lấy NGAY từ bộ nhớ đệm (0ms delay, không quay spinner).
              </li>
              <li className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-amber-400">3. Stale (Cũ):</strong> Khi quá 5 phút, dữ liệu bị coi là cũ. Nếu người dùng chuyển lại tab, TanStack Query vẫn trả về dữ liệu cũ ngay tức thì nhưng đồng thời tự động gọi API ngầm (Background Refetch) để cập nhật mới.
              </li>
              <li className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-purple-400">4. Inactive:</strong> Không còn component nào đang sử dụng QueryKey này. Dữ liệu tiếp tục được lưu trong bộ nhớ thêm <code>gcTime: 10 phút</code> trước khi bị Garbage Collector giải phóng.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              2. Xử lý Bẫy Dữ liệu: Nút "Làm mới Dữ liệu" (Force Refresh)
            </h4>
            <p className="text-xs text-slate-400">
              Mặc dù có <code>staleTime: 5 phút</code>, khi sếp bấm nút <strong>Force Refresh</strong>, hàm <code>refetch()</code> sẽ chủ động bỏ qua bộ đếm staleTime và ép gọi API mạng lập tức, cập nhật doanh thu mới nhất.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu vòng đời Cache
          </button>
        </div>
      </div>
    </div>
  );
};
