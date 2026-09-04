import React from 'react';
import { Layers, CheckCircle2, XCircle, ShieldCheck, Sparkles, X } from 'lucide-react';

interface UXComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UXComparisonModal: React.FC<UXComparisonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Báo cáo So sánh UX: isLoading (Hard Loading) vs isFetching (Soft Loading)
            </h3>
            <p className="text-xs text-slate-400">
              Đánh giá sự đánh đổi giữa các phương án thiết kế UI dựa trên trạng thái vòng đời TanStack Query
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-300 border-b border-slate-800">
                <th className="p-4 font-bold">Tiêu chí Đánh giá</th>
                <th className="p-4 font-bold text-rose-400">Giải pháp 1: Dùng chung 1 Indicator</th>
                <th className="p-4 font-bold text-emerald-400">Giải pháp 2: Tách biệt Skeleton & Soft Pulse (Chốt)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-4 font-semibold text-white">1. Trải nghiệm người dùng (UX)</td>
                <td className="p-4 text-rose-400">
                  ❌ Rất kém. Cứ mỗi lần refetch ngầm, toàn màn hình bị che trắng bởi Spinner, gián đoạn việc đọc và thao tác của nhân viên.
                </td>
                <td className="p-4 text-emerald-400 font-medium">
                  ✅ Xuất sắc. Giữ nguyên bảng dữ liệu cho phép đọc và click bình thường, chỉ báo hiệu ngầm bằng chấm nhỏ / line pulse ở góc.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">2. Phân biệt Trạng thái Vòng đời</td>
                <td className="p-4 text-amber-400">
                  ⚠️ Không phân biệt được giữa việc "chưa có data" và "đang refresh data cũ".
                </td>
                <td className="p-4 text-emerald-400 font-medium">
                  ✅ Rõ ràng: `isLoading` (`isPending && isFetching`) dùng Skeleton; `isFetching && !isLoading` dùng Soft Indicator.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">3. Độ phức tạp mã nguồn (Complexity)</td>
                <td className="p-4 text-emerald-400 font-medium">
                  ✅ Rất đơn giản: Chỉ 1 cờ <code>if (isFetching) return &lt;Spinner /&gt;</code>.
                </td>
                <td className="p-4 text-slate-300">
                  ⚠️ Cần viết component Skeleton và tách biệt 2 luồng render theo cờ trạng thái.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conclusion */}
        <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-emerald-950/40 border border-emerald-800/60 rounded-2xl space-y-2">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Kết luận & Lựa chọn Tối ưu:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            👉 <strong>Lựa chọn Giải pháp 2</strong> làm quy chuẩn thiết kế UI cho toàn bộ hệ thống. Mặc dù tốn thêm một chút công sức dựng Skeleton, nhưng mang lại trải nghiệm liền mạch, chuyên nghiệp và không bao giờ làm giật màn hình khi có các tác vụ Background Polling / Refetch ngầm.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu so sánh UX
          </button>
        </div>
      </div>
    </div>
  );
};
