import React from 'react';
import { Layers, ArrowRight, CheckCircle2, XCircle, ShieldCheck, HelpCircle, X } from 'lucide-react';

interface HistoryStackVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryStackVisualizer: React.FC<HistoryStackVisualizerProps> = ({ isOpen, onClose }) => {
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
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Phân tích Bẫy Dữ liệu: Ngăn xếp Lịch sử Trình duyệt (Browser History Stack)
            </h3>
            <p className="text-xs text-slate-400">
              Cơ chế ngăn chặn lỗi lặp vòng vô hạn khi nhấn nút "Back" sau khi Đăng nhập
            </p>
          </div>
        </div>

        {/* Comparison: Bug vs Solution */}
        <div className="space-y-4 text-xs">
          {/* Bug explanation */}
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-2">
            <div className="flex items-center justify-between text-rose-400 font-bold text-sm">
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Trường hợp lỗi nếu DÙNG `push` (Mặc định `navigate(from)` không có replace):
              </span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[11px] text-rose-200 space-y-1">
              <div>1. Người dùng gõ URL: <code>/classroom/room-101</code></div>
              <div>2. ProtectedRoute đẩy vào: <code>/login (state: &#123; from: '/classroom/room-101' &#125;)</code></div>
              <div>3. Người dùng đăng nhập ➔ Gọi <code>navigate('/classroom/room-101')</code> (Push thêm vào stack)</div>
              <div>4. <strong>Lỗi xảy ra:</strong> Khi người dùng bấm nút "Back" trên trình duyệt, trình duyệt lùi lại mục trước trong Stack là <code>/login</code>! Trang login lại thấy đã đăng nhập và đẩy đi tiếp, tạo thành vòng lặp khó chịu.</div>
            </div>
          </div>

          {/* Solution explanation */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Giải pháp Chuẩn: DÙNG <code>&#123; replace: true &#125;</code> trong <code>Navigate</code> và <code>useNavigate</code>:
              </span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[11px] text-emerald-200 space-y-1">
              <div>1. ProtectedRoute: <code>&lt;Navigate to="/login" state=&#123;&#123; from: location &#125;&#125; replace /&gt;</code></div>
              <div>2. Trong LoginPage: <code>navigate(from, &#123; replace: true &#125;);</code></div>
              <div>3. <strong>Kết quả:</strong> Entry <code>/login</code> bị ghi đè (replace) hoàn toàn khỏi History Stack. Khi người dùng bấm "Back", họ quay về trang trước đó (ví dụ Trang chủ) một cách tự nhiên và mượt mà!</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition shadow"
          >
            Đã nắm vững cơ chế History Stack
          </button>
        </div>
      </div>
    </div>
  );
};
