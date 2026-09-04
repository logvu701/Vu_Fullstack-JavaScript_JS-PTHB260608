import React from 'react';
import { Activity, ArrowRight, CheckCircle2, Globe, Laptop, RefreshCw, X, ShieldAlert } from 'lucide-react';

interface EventFlowVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventFlowVisualizer: React.FC<EventFlowVisualizerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Bắt sự kiện người dùng (User Event Trigger)',
      desc: 'Người dùng nhập ký tự vào ô tìm kiếm hoặc chọn danh mục / cấp độ.',
      code: 'onChange={(e) => updateParams({ q: e.target.value })}',
      color: 'border-blue-200 bg-blue-50/70 text-blue-900',
      badge: 'Giao diện',
    },
    {
      title: '2. Xử lý & Làm sạch tham số (Sanitization & Delete Trash)',
      desc: 'Kiểm tra nếu giá trị rỗng ("") hoặc mặc định ("all"), gọi searchParams.delete("q") để không để lại ?q= rác.',
      code: 'if (!value || value === "") nextParams.delete(key);\nelse nextParams.set(key, value.trim());',
      color: 'border-amber-200 bg-amber-50/70 text-amber-900',
      badge: 'Bẫy Dữ liệu',
    },
    {
      title: '3. Cập nhật thanh địa chỉ URL (useSearchParams Update)',
      desc: 'Gọi setSearchParams(nextParams, { replace: true }) đồng bộ trạng thái mới lên URL trình duyệt.',
      code: 'setSearchParams(nextParams, { replace: true });',
      color: 'border-teal-200 bg-teal-50/70 text-teal-900',
      badge: 'Router Sync',
    },
    {
      title: '4. Khôi phục trạng thái khi Tải lại trang (Hydration on Mount/Reload)',
      desc: 'Khi người dùng tải lại trang hoặc truy cập qua link chia sẻ, component đọc URL qua searchParams.get("q") để khôi phục input và mảng lọc.',
      code: 'const queryFromUrl = searchParams.get("q") || "";\nconst [searchTerm, setSearchTerm] = useState(queryFromUrl);',
      color: 'border-emerald-200 bg-emerald-50/70 text-emerald-900',
      badge: 'Đồng bộ 2 chiều',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/10 text-teal-600 rounded-2xl">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Sơ đồ Luồng Bắt Sự kiện & Đồng bộ URL
            </h3>
            <p className="text-xs text-slate-500">
              Kiến trúc Two-way Synchronization giữa React State và Browser URL Query Params
            </p>
          </div>
        </div>

        {/* Steps flowchart */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${step.color} space-y-2 transition-all`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border shadow-xs">
                  {step.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-x-auto">
                {step.code}
              </pre>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition shadow"
          >
            Đã xem xong luồng
          </button>
        </div>
      </div>
    </div>
  );
};
