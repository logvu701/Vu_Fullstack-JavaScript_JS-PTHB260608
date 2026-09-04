import React from 'react';
import { X, BookOpen, AlertTriangle, Zap, Code } from 'lucide-react';

interface OptimisticDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptimisticDocModal: React.FC<OptimisticDocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Tài Liệu Kỹ Thuật: Optimistic Updates & Rollback Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Giải mã luồng điều phối useMutation trong TanStack Query v5
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          {/* Section 1: So sánh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                Pessimistic Update (Truyền thống)
              </div>
              <p className="text-xs text-slate-400">
                Khi người dùng bấm nút, giao diện khóa lại và quay spinner suốt 2 - 3 giây chờ máy chủ phản hồi. Tạo cảm giác giật lag, đứt gãy trải nghiệm người dùng.
              </p>
              <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-400">
                Click &rarr; Quay Spinner (2.0s) &rarr; Cập nhật UI
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <Zap className="w-4 h-4" />
                Optimistic Update (Hiện đại)
              </div>
              <p className="text-xs text-slate-300">
                Giao diện đổi màu xanh ngay lập tức tại <code>t = 0.0s</code>, đồng thời gửi request ngầm. Nếu server trả lỗi 500, tự động Rollback về dữ liệu cũ và hiện cảnh báo.
              </p>
              <div className="text-[11px] font-mono bg-slate-900 p-2 rounded text-emerald-300">
                Click &rarr; Đổi UI (0.0s) &rarr; Gửi API ngầm (2.0s) &rarr; Tự động Rollback nếu lỗi
              </div>
            </div>
          </div>

          {/* Section 2: 3 Giai đoạn cốt lõi */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              Quy Trình 3 Bước Với useMutation
            </h3>

            {/* Bước 1 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-xs uppercase">1. onMutate (Kích hoạt tức thì t = 0.0s)</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Snapshot & Optimistic Write</span>
              </div>
              <p className="text-xs text-slate-400">
                Thực hiện 4 nhiệm vụ quan trọng:
              </p>
              <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 font-mono">
                <li><code>await queryClient.cancelQueries(&#123; queryKey: ['disputes'] &#125;)</code> để tránh background refetch đè lên dữ liệu mới.</li>
                <li><code>const previousDisputes = queryClient.getQueryData(['disputes'])</code> lưu snapshot dữ liệu cũ.</li>
                <li><code>queryClient.setQueryData(['disputes'], ...)</code> cập nhật cache client ngay lập tức.</li>
                <li><code>return &#123; previousDisputes &#125;</code> chuyển context sang cho onError.</li>
              </ol>
            </div>

            {/* Bước 2 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 text-xs uppercase">2. onError (Cơ chế phòng thủ Rollback)</span>
                <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">Khôi phục an toàn</span>
              </div>
              <p className="text-xs text-slate-400">
                Khi server trả về lỗi (Status 500, Mất mạng, Lỗi phân quyền), lấy snapshot từ <code>context.previousDisputes</code> và hoàn tác dữ liệu cache:
              </p>
              <pre className="text-[11px] font-mono bg-slate-900 p-2.5 rounded text-rose-300 overflow-x-auto">
{`onError: (err, variables, context) => {
  if (context?.previousDisputes) {
    queryClient.setQueryData(['disputes'], context.previousDisputes);
  }
  showErrorToast(err.message);
}`}
              </pre>
            </div>

            {/* Bước 3 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-xs uppercase">3. onSettled (Đồng bộ tuyệt đối)</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">Final Sync</span>
              </div>
              <p className="text-xs text-slate-400">
                Dù thành công hay thất bại, luôn gọi <code>queryClient.invalidateQueries(&#123; queryKey: ['disputes'] &#125;)</code> để đảm bảo client và database trên server hoàn toàn khớp nhau.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/30"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
