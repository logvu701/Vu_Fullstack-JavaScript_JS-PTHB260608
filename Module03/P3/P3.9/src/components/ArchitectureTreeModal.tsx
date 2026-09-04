import React from 'react';
import { GitBranch, Shield, Lock, Globe, CheckCircle2, X } from 'lucide-react';

interface ArchitectureTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureTreeModal: React.FC<ArchitectureTreeModalProps> = ({ isOpen, onClose }) => {
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
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl">
            <GitBranch className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Bản vẽ Kiến trúc Cây Định Tuyến & Vùng Bảo Mật (Protected Boundary)
            </h3>
            <p className="text-xs text-slate-400">
              Phân cấp Định tuyến Công khai (Public) và Vùng bảo mật (Protected Zones)
            </p>
          </div>
        </div>

        {/* Tree ASCII & Component Structure */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-3 leading-relaxed text-slate-300">
          <div className="text-purple-400 font-bold">App.tsx (Root Layout & Router)</div>
          <div className="pl-4 border-l-2 border-slate-800 space-y-2">
            <div>├── 🌐 <span className="text-emerald-400 font-bold">PUBLIC ZONE (Truy cập tự do)</span></div>
            <div className="pl-6 space-y-1 text-slate-400">
              <div>├── <span className="text-white">Route "/"</span> ➔ HomePage (Danh sách khóa học công khai)</div>
              <div>├── <span className="text-white">Route "/login"</span> ➔ LoginPage (Form xác thực)</div>
              <div>├── <span className="text-white">Route "/unauthorized"</span> ➔ 403 Forbidden Page</div>
              <div>└── <span className="text-white">Route "*"</span> ➔ 404 Not Found Page</div>
            </div>

            <div className="pt-2">├── 🔒 <span className="text-indigo-400 font-bold">&lt;ProtectedRoute&gt;</span> (Protected Boundary: Yêu cầu Đăng nhập)</div>
            <div className="pl-6 space-y-1 text-slate-400">
              <div>├── <span className="text-white">Route "/dashboard"</span> ➔ DashboardPage (Xem tiến độ, chứng chỉ)</div>
              <div>└── <span className="text-white">Route "/classroom/:roomId"</span> ➔ VirtualClassroomPage (Phòng học trực tuyến)</div>
            </div>

            <div className="pt-2">└── 🛡️ <span className="text-rose-400 font-bold">&lt;ProtectedRoute allowedRoles={['admin']}&gt;</span> (Role-Based Admin Zone)</div>
            <div className="pl-6 space-y-1 text-slate-400">
              <div>└── <span className="text-white">Route "/admin"</span> ➔ AdminPage (Quản trị hệ thống)</div>
            </div>
          </div>
        </div>

        {/* Architecture Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-1">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-400" />
              Cơ chế Chặn Truy cập Trái phép:
            </span>
            <p className="text-slate-400 leading-relaxed">
              Nếu người dùng copy và dán trực tiếp đường dẫn <code>/classroom/room-101</code> vào thanh địa chỉ mà chưa đăng nhập, <code>ProtectedRoute</code> lập tức chặn và redirect sang <code>/login</code> kèm <code>state: &#123; from: location &#125;</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-1">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Điều hướng Mệnh lệnh (Imperative Navigation):
            </span>
            <p className="text-slate-400 leading-relaxed">
              Sau khi người dùng đăng nhập thành công tại form Login, ứng dụng sử dụng <code>useNavigate</code> để đưa người dùng trở lại đúng trang họ định truy cập ban đầu thay vì đẩy về trang chủ mặc định.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition shadow"
          >
            Đóng sơ đồ
          </button>
        </div>
      </div>
    </div>
  );
};
