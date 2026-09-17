import React, { useState } from "react";
import {
  INITIAL_USER,
  updateUserWithPut,
  updateUserWithPatch,
  resetServerDatabase,
  getCurrentServerState,
} from "./api/userApi";
import { UserProfile, ExecutionLog } from "./types/user";
import { ReportModal } from "./components/ReportModal";
import { PayloadInspector } from "./components/PayloadInspector";
import {
  UserCheck,
  FileText,
  RotateCcw,
  Phone,
  Mail,
  Building,
  Briefcase,
  DollarSign,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(getCurrentServerState());
  const [lastLog, setLastLog] = useState<ExecutionLog | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [customPhone, setCustomPhone] = useState("0988776655");

  // Nhân viên B new payload data
  const employeeBFullProfile: UserProfile = {
    id: "EMP-2026",
    fullName: "Đỗ Minh Khang (Updated)",
    email: "khang.do.lead@rikkeiedu.vn",
    phone: "0966889900",
    department: "Trung tâm Đổi mới Sáng tạo & R&D",
    position: "Principal System Architect",
    salary: 50000000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    address: "Tòa Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội",
  };

  // Scenario A1: Employee A updates phone with PATCH
  const handlePatchPhone = async () => {
    const { user, log } = await updateUserWithPatch(currentUser.id || "EMP-2026", {
      phone: customPhone,
    });
    setCurrentUser(user);
    setLastLog(log);
  };

  // Scenario A2: Employee A updates phone with PUT (Data trap: sending only phone)
  const handlePutPhoneTrap = async () => {
    const { user, log } = await updateUserWithPut(currentUser.id || "EMP-2026", {
      phone: customPhone,
    });
    setCurrentUser(user);
    setLastLog(log);
  };

  // Scenario B: Employee B overwrites full profile with PUT
  const handlePutFullProfile = async () => {
    const { user, log } = await updateUserWithPut(
      employeeBFullProfile.id,
      employeeBFullProfile
    );
    setCurrentUser(user);
    setLastLog(log);
  };

  // Reset database
  const handleReset = () => {
    const restored = resetServerDatabase();
    setCurrentUser(restored);
    setLastLog(null);
    setCustomPhone("0988776655");
  };

  // Check how many of 10 fields exist in currentUser
  const knownFields: (keyof UserProfile)[] = [
    "id",
    "fullName",
    "email",
    "phone",
    "department",
    "position",
    "salary",
    "avatar",
    "status",
    "address",
  ];
  const existingFieldCount = knownFields.filter((k) => currentUser && currentUser[k] !== undefined).length;
  const isDataCorrupted = existingFieldCount < 10;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.6 - Phân Tích Hành Vi: PUT vs PATCH
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                  RFC 7231 vs RFC 5789
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Khảo sát tính Lũy đẳng (Idempotency), kích thước Payload và Rủi ro Mất dữ liệu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi Phục Database Gốc</span>
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Báo Cáo Phân Tích (I/O)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Data loss alert banner */}
        {isDataCorrupted && (
          <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-start gap-3 animate-fade-in text-red-900">
            <Flame className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold">
                CẢNH BÁO DATA LOSS: HỒ SƠ ĐÃ BỊ MẤT {10 - existingFieldCount} TRƯỜNG DỮ LIỆU!
              </h4>
              <p className="text-xs text-red-700 mt-1">
                Nguyên nhân: Bạn vừa thực thi phương thức <strong>PUT</strong> nhưng chỉ gửi 1 trường trong Body. Máy chủ RESTful đã ghi đè toàn bộ bản ghi bằng đối tượng mới, khiến các trường khác bị hủy hoàn toàn.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl"
            >
              Khôi phục ngay
            </button>
          </div>
        )}

        {/* Two-column layout: Current User Profile vs Control Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: User 10-Field Visual Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Trạng Thái Hồ Sơ Trên Máy Chủ (10 Trường)
              </h3>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isDataCorrupted
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {existingFieldCount}/10 trường còn lại
              </span>
            </div>

            {/* Profile Avatar & Header */}
            <div className="flex items-center gap-4">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName || "User"}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs border border-dashed border-red-300 text-red-500">
                  [Đã mất]
                </div>
              )}
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {currentUser.fullName || (
                    <span className="text-red-500 font-mono text-sm italic">[fullName: deleted]</span>
                  )}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    ID: {currentUser.id}
                  </span>
                  {currentUser.status ? (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {currentUser.status}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      status: lost
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 10 Fields List */}
            <div className="space-y-2.5 pt-2 text-xs divide-y divide-slate-50 font-sans">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-indigo-500" />
                  <span>1. Số điện thoại (phone):</span>
                </span>
                <span className="font-mono font-bold text-slate-900 bg-indigo-50 px-2 py-0.5 rounded text-indigo-700">
                  {currentUser.phone || "[Trống]"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>2. Email:</span>
                </span>
                <span className={currentUser.email ? "font-mono text-slate-800" : "text-red-500 italic font-mono"}>
                  {currentUser.email || "[Đã bị xóa bằng PUT]"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>3. Phòng ban (department):</span>
                </span>
                <span className={currentUser.department ? "font-medium text-slate-800" : "text-red-500 italic font-mono"}>
                  {currentUser.department || "[Đã bị xóa bằng PUT]"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>4. Chức danh (position):</span>
                </span>
                <span className={currentUser.position ? "font-medium text-slate-800" : "text-red-500 italic font-mono"}>
                  {currentUser.position || "[Đã bị xóa bằng PUT]"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>5. Mức lương (salary):</span>
                </span>
                <span className={currentUser.salary ? "font-mono font-bold text-emerald-600" : "text-red-500 italic font-mono"}>
                  {currentUser.salary ? `${currentUser.salary.toLocaleString("vi-VN")} ₫` : "[Đã bị xóa bằng PUT]"}
                </span>
              </div>

              <div className="flex items-start justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-2 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>6. Địa chỉ (address):</span>
                </span>
                <span className={`text-right text-[11px] truncate max-w-[200px] ${currentUser.address ? "text-slate-700" : "text-red-500 italic font-mono"}`}>
                  {currentUser.address || "[Đã bị xóa bằng PUT]"}
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Action Scenarios (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Scenario A: Employee A */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Kịch Bản Nhân Viên A: Chỉ Đổi "Số Điện Thoại"
                    </h3>
                    <p className="text-xs text-slate-500">
                      Bảng nhân sự có 10 trường, nhân viên chỉ muốn cập nhật 1 trường duy nhất.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số điện thoại mới muốn đổi:
                </label>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Two buttons for Employee A */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Button 1: PATCH */}
                <button
                  onClick={handlePatchPhone}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Hàm 2: axios.patch
                    </span>
                    <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-[10px]">
                      Khuyên Dùng
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-tight">
                    Chỉ gửi payload <code className="font-mono">{`{ phone }`}</code>. 9 trường còn lại được máy chủ giữ nguyên.
                  </p>
                </button>

                {/* Button 2: PUT (Trap) */}
                <button
                  onClick={handlePutPhoneTrap}
                  className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-rose-800 mb-1">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Hàm 1: axios.put (Bẫy Nghiệp Vụ)
                    </span>
                    <span className="bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded text-[10px]">
                      Gửi Thiếu Trường
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-700 leading-tight">
                    Gửi PUT chỉ có <code className="font-mono">{`{ phone }`}</code>. Server sẽ XÓA SẠCH 9 trường còn lại!
                  </p>
                </button>
              </div>
            </div>

            {/* Scenario B: Employee B */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Kịch Bản Nhân Viên B: Ghi Đè Toàn Bộ Hồ Sơ (10 Trường)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Nhân viên thăng chức, chuyển phòng ban và cập nhật toàn diện hồ sơ mới.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1 font-mono">
                <div>Payload: Đầy đủ 10/10 trường (fullName, email, phone, salary: 50.000.000₫...)</div>
                <div className="text-[11px] text-indigo-600">Đảm bảo tính Lũy đẳng (Idempotency) theo RFC 7231</div>
              </div>

              <button
                onClick={handlePutFullProfile}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Thực Hiện Ghi Đè Toàn Bộ Hồ Sơ Bằng axios.put (Full Payload)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Payload Inspector */}
        <PayloadInspector lastLog={lastLog} />
      </main>

      {/* Technical Report Modal */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}
