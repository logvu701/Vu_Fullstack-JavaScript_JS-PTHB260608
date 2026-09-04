import React from 'react';
import { X, BookOpen, Layers, ShieldCheck, Code, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SlicesDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlicesDocModal: React.FC<SlicesDocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Tài Liệu Kỹ Thuật: Zustand Slices Pattern & Vanilla JS State
              </h2>
              <p className="text-xs text-slate-400">
                Phân tích kiến trúc lát cắt và cách đọc Zustand State bên ngoài React Components
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
          {/* Section 1: Slices Pattern */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              1. Tại Sao Cần Zustand Slices Pattern?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trong các dự án lớn, việc dồn toàn bộ state (Auth, UI, Giỏ hàng, Cài đặt) vào 1 file store duy nhất sẽ gây phình to, khó bảo trì và dễ xảy ra xung đột merge code. Zustand Slices Pattern cho phép tách nhỏ store thành các "lát cắt" độc lập với type-safety tuyệt đối:
            </p>
            <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded text-purple-300 overflow-x-auto">
{`// Tạo boundStore hợp nhất từ nhiều slice creators:
export const useBoundStore = create<BoundStoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
}));`}
            </pre>
          </div>

          {/* Section 2: Đọc State ngoài React */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              2. Đọc State Ngoài React (Vanilla JS Context)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Các file như Axios Interceptor, WebSocket service, Web Worker hay Analytics helper không phải là React Components nên <strong>không thể dùng React Hooks</strong> (như <code>useBoundStore()</code>). Zustand giải quyết hoàn hảo bằng phương thức <code>.getState()</code>:
            </p>
            <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded text-indigo-300 overflow-x-auto">
{`axiosClient.interceptors.request.use((config) => {
  // Lấy state trực tiếp từ Zustand ngoài React
  const token = useBoundStore.getState().token;
  
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`}
            </pre>
          </div>

          {/* Section 3: Bẫy dữ liệu */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <h3 className="font-bold text-rose-300 flex items-center gap-2 text-xs uppercase">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              3. Bẫy Dữ Liệu (Data Trap): Authorization Header Rỗng
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Khi người dùng đăng xuất, <code>token</code> chuyển về <code>null</code>. Nếu không kiểm tra điều kiện chặt chẽ, interceptor sẽ vô tình gửi header <code>Authorization: Bearer null</code> hoặc <code>Bearer undefined</code>. Máy chủ bảo mật sẽ coi đây là chuỗi token không hợp lệ và từ chối request ngay cả đối với các Public API.
            </p>
            <div className="text-[11px] font-mono text-emerald-300 bg-slate-900 p-2 rounded">
              Giải pháp: Luôn kiểm tra <code>if (token && token.trim() !== '')</code> trước khi set Header, và <code>delete config.headers.Authorization</code> khi token là null.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-900/30"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
