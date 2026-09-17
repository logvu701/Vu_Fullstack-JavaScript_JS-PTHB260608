import React from "react";
import { GitBranch, X, CheckCircle, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

interface SequenceDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SequenceDiagramModal: React.FC<SequenceDiagramModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Sơ Đồ Tuần Tự (Sequence Diagram): Luồng Hủy Request & Chống Race Condition
              </h3>
              <p className="text-xs text-emerald-700 font-medium">
                Sử dụng Web API AbortController kết hợp với axios.isCancel()
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
          {/* Visual Step-by-Step Flow Chart */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs space-y-4">
            <div className="text-emerald-400 font-bold font-sans flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>SƠ ĐỒ TRỰC QUAN DIỄN TIẾN THỜI GIAN THỰC (TIMELINE):</span>
            </div>

            <div className="space-y-3 pl-2 border-l-2 border-slate-800 font-sans">
              <div className="space-y-1">
                <span className="text-blue-400 font-bold font-mono">1. User gõ "i"</span>
                <p className="text-xs text-slate-400">
                  UI khởi tạo <code className="text-slate-200 font-mono">AbortController #1</code>. Bắn <code className="text-slate-200 font-mono">GET /search?q=i</code> với độ trễ mạng 1200ms.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-amber-400 font-bold font-mono">2. User gõ tiếp "ip" (sau 200ms)</span>
                <p className="text-xs text-slate-400">
                  UI chủ động gọi ngay <code className="text-rose-400 font-mono font-bold">controller1.abort()</code> &rarr; Request #1 bị ngắt kết nối lập tức!
                </p>
                <div className="p-2 bg-rose-950/50 border border-rose-800/40 rounded text-rose-300 text-[11px]">
                  <strong>Bẫy dữ liệu:</strong> Request 1 nhảy vào <code className="font-mono">catch (err)</code>. Kiểm tra <code className="font-mono text-emerald-400">axios.isCancel(err) === true</code> &rarr; Nhận diện là hủy chủ động, bỏ qua an toàn, không báo lỗi!
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-400 font-bold font-mono">3. User gõ tiếp "iphone"</span>
                <p className="text-xs text-slate-400">
                  <code className="text-slate-200 font-mono">AbortController #2</code> tiếp tục bị hủy. <code className="text-slate-200 font-mono">AbortController #3</code> gửi yêu cầu với từ khóa "iphone".
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-teal-400 font-bold font-mono">4. Request #3 Hoàn tất & Trả kết quả</span>
                <p className="text-xs text-slate-400">
                  Giao diện hiển thị các dòng iPhone 16 Pro Max... Kết quả chính xác 100%, loại bỏ hoàn toàn nguy cơ Request cũ về muộn ghi đè (Race Condition).
                </p>
              </div>
            </div>
          </div>

          {/* Business Trap Analysis */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Phân Tích Bẫy Dữ Liệu: Tại sao bắt buộc dùng axios.isCancel()?</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Theo quy chuẩn của trình duyệt và Axios, việc hủy request không được coi là luồng thành công mà sẽ kích hoạt cơ chế Reject và ném ngoại lệ <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">CanceledError</code> vào khối <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">catch</code>. Nếu lập trình viên không dùng <code className="font-mono font-bold text-emerald-800">axios.isCancel(err)</code> để phân biệt, ứng dụng sẽ nhầm lẫn việc hủy là "Lỗi mất mạng", gây ra hàng loạt cảnh báo lỗi giả mạo trên màn hình người dùng và console rác.
            </p>
          </div>

          {/* Solution Code Pattern */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Đoạn mã Triển khai Chuẩn mực:
            </h4>
            <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto">
{`const abortControllerRef = useRef<AbortController | null>(null);

const handleSearch = async (query: string) => {
  // 1. Hủy bỏ request đang bay dở trước đó
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  // 2. Khởi tạo controller mới cho lần gõ phím hiện tại
  const newController = new AbortController();
  abortControllerRef.current = newController;

  try {
    const res = await axios.get('/api/products', {
      params: { q: query },
      signal: newController.signal, // Gắn signal
    });
    setProducts(res.data);
  } catch (err) {
    if (axios.isCancel(err)) {
      // Bẫy dữ liệu: Nhận diện hủy chủ động, không đổi UI, không console.error rác!
      return;
    }
    // Lỗi mạng thật sự mới hiển thị cảnh báo
    showError("Không thể kết nối máy chủ");
  }
};`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng Sơ Đồ
          </button>
        </div>
      </div>
    </div>
  );
};
