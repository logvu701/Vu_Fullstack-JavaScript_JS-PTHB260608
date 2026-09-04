import React from 'react';
import { X, GitMerge, Database, Layers, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface DataFlowDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataFlowDiagramModal: React.FC<DataFlowDiagramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Sơ Đồ Phối Hợp Trạng Thái 2 Chiều: Zustand & TanStack Query
              </h2>
              <p className="text-xs text-slate-400">
                Mô hình End-to-End State Management cho dự án Enterprise
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
          {/* Section 1: Phân tách trách nhiệm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
                <Layers className="w-4 h-4" />
                Zustand (Client UI State)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đảm nhiệm toàn bộ trạng thái giao diện nội bộ:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-mono">
                <li><code>selectedItem</code>: Sản phẩm đang được chọn sửa</li>
                <li><code>isSidebarOpen</code>: Trạng thái đóng/mở Drawer</li>
                <li><code>searchQuery</code>: Từ khóa lọc (tự động .trim())</li>
                <li><code>categoryFilter</code>: Danh mục hiện tại</li>
                <li><code>toasts</code>: Hàng đợi thông báo hệ thống</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                <Database className="w-4 h-4" />
                TanStack Query (Server State Cache)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đảm nhiệm trạng thái từ máy chủ & đồng bộ Cache:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-mono">
                <li><code>useQuery(['inventory', &#123; search, category &#125;])</code></li>
                <li>Tự động kích hoạt lại query khi key thay đổi</li>
                <li><code>useMutation</code>: Cập nhật số lượng tồn kho</li>
                <li><code>invalidateQueries</code>: Làm mới dữ liệu sau sửa đổi</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Vòng đời 4 bước Cross-State Sync */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Vòng Lặp Điều Phối Trạng Thái 4 Bước
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase">Bước 1: Trigger</span>
                <p className="font-semibold text-slate-200">Click "Điều chỉnh"</p>
                <p className="text-[11px] text-slate-400">
                  Gọi <code>openSidebar(item)</code> trong Zustand để mở Drawer.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Bước 2: Form & Validate</span>
                <p className="font-semibold text-slate-200">Kiểm thử Bẫy Lỗi</p>
                <p className="text-[11px] text-slate-400">
                  Chặn số lượng âm (&lt; 0) và vượt định mức (&gt; 10,000).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Bước 3: Mutation</span>
                <p className="font-semibold text-slate-200">Gửi TanStack Mutation</p>
                <p className="text-[11px] text-slate-400">
                  Gửi payload cập nhật lên Mock API với độ trễ 800ms.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Bước 4: Đồng bộ 2 chiều</span>
                <p className="font-semibold text-slate-200">onSuccess Handlers</p>
                <p className="text-[11px] text-slate-400">
                  Zustand đóng Drawer + TanStack làm mới Cache + Hiện Toast.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-900/30"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
