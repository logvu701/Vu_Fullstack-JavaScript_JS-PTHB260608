import React from 'react';
import { GitMerge, ArrowRight, CheckCircle2, Layers, Zap, X, ShieldAlert } from 'lucide-react';

interface ArchitectureFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureFlowModal: React.FC<ArchitectureFlowModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'UI Interaction (Tương tác Người dùng)',
      desc: 'Người dùng click chọn Tab Trạng thái (Pending / Shipped / Delivered) hoặc gõ từ khóa vào ô tìm kiếm.',
      tech: 'React Component Event (onClick, onChange)',
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    },
    {
      num: '2',
      title: 'Zustand Action & Data Trap Sanitization',
      desc: 'Hành động setStatus() hoặc setSearchQuery() được gọi. Bẫy dữ liệu .trim() được thực thi ngay tại Zustand trước khi cập nhật Client State.',
      tech: 'Zustand Store (useFilterStore)',
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    },
    {
      num: '3',
      title: 'Reactive TanStack Query Key (Không cần useEffect!)',
      desc: 'Hook useQuery đọc trực tiếp state từ Zustand vào queryKey: ["orders", { status, search }]. Khi Key đổi, TanStack Query tự động phát hiện và kích hoạt QueryFn.',
      tech: 'TanStack Query (queryKey dependency tracking)',
      color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      num: '4',
      title: 'Server Fetch & Cache Hydration',
      desc: 'QueryFn gọi fetchOrders(status, search). Dữ liệu nhận về được lưu vào Cache và render mượt mà lên bảng.',
      tech: 'Server State Management',
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
  ];

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
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl">
            <GitMerge className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Phân tích Luồng Dữ liệu (I/O): UI ➔ Zustand ➔ TanStack Query
            </h3>
            <p className="text-xs text-slate-400">
              Kiến trúc Đại Thống Nhất kết hợp Client State & Server State không dùng useEffect
            </p>
          </div>
        </div>

        {/* Steps Flow */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`p-4 rounded-2xl border ${step.color} space-y-1.5 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                    {step.num}
                  </span>
                  <h4 className="font-bold text-sm text-white">{step.title}</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  {step.tech}
                </span>
              </div>
              <p className="text-xs text-slate-300 pl-8 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Anti-pattern explanation */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
          <span className="font-bold text-rose-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Tại sao KHÔNG NÊN dùng useEffect để fetch lại khi state đổi?
          </span>
          <p className="text-slate-400 leading-relaxed">
            Nhiều developer có thói quen dùng <code>useEffect(() =&gt; &#123; refetch() &#125;, [status])</code>. Đây là anti-pattern gây duplicate render và mất tính năng tự động deduplication của TanStack Query. Bằng cách nhúng trực tiếp Zustand state vào <code>queryKey</code>, TanStack Query sẽ quản lý vòng đời fetch một cách tự nhiên và tối ưu nhất.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
