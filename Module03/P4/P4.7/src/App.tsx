import React, { useState, useEffect } from "react";
import {
  executeCrmApiCall,
  setAuthToken,
  getAuthToken,
  MOCK_JWT_TOKEN,
} from "./api/crmClient";
import { Customer, DealStat, NetworkInspection } from "./types/crm";
import { NetworkHeaderInspector } from "./components/NetworkHeaderInspector";
import { ProofModal } from "./components/ProofModal";
import {
  Building2,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  LogIn,
  LogOut,
  Image as ImageIcon,
  DollarSign,
  Users,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<DealStat | null>(null);
  const [inspection, setInspection] = useState<NetworkInspection | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"customers" | "stats">("customers");
  const [bannerAlert, setBannerAlert] = useState<{
    type: "success" | "error" | "trap";
    message: string;
  } | null>(null);

  // Toggle authentication
  const handleToggleLogin = () => {
    if (isLoggedIn) {
      setAuthToken(null);
      setIsLoggedIn(false);
      setBannerAlert({
        type: "trap",
        message:
          "Bạn đã Đăng xuất! Token = null. Thử gọi API ngay bây giờ để kiểm tra cơ chế Interceptor không bị sập và Server trả về 401.",
      });
    } else {
      setAuthToken(MOCK_JWT_TOKEN);
      setIsLoggedIn(true);
      setBannerAlert({
        type: "success",
        message: "Đã đăng nhập thành công! Access Token đã được nạp vào bộ nhớ.",
      });
    }
  };

  // Fetch Customers
  const handleFetchCustomers = async () => {
    setLoading(true);
    setActiveTab("customers");
    try {
      const result = await executeCrmApiCall("/customers");
      setCustomers(result.data);
      setInspection(result.inspection);
      setBannerAlert({
        type: "success",
        message:
          "Gọi API GET /customers thành công (200 OK)! Header 'Authorization: Bearer <token>' đã được tiêm tự động.",
      });
    } catch (err: any) {
      if (err.inspection) {
        setInspection(err.inspection);
      }
      setBannerAlert({
        type: "error",
        message: err.message || "Lỗi 401 Unauthorized: Yêu cầu bị máy chủ từ chối do thiếu Token.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Stats
  const handleFetchStats = async () => {
    setLoading(true);
    setActiveTab("stats");
    try {
      const result = await executeCrmApiCall("/deal-stats");
      setStats(result.data);
      setInspection(result.inspection);
      setBannerAlert({
        type: "success",
        message:
          "Gọi API GET /deal-stats thành công (200 OK)! Bearer Token được tiêm tự động bởi Interceptor.",
      });
    } catch (err: any) {
      if (err.inspection) {
        setInspection(err.inspection);
      }
      setBannerAlert({
        type: "error",
        message: err.message || "Lỗi 401 Unauthorized",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/25">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.7 - Tự Động Hóa Định Danh với Request Interceptor
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                  Bearer Token Injection
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Can thiệp vòng đời Request • Tiêm siêu dữ liệu xác thực • Bẫy lỗi 401 an toàn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Login / Logout switcher */}
            <button
              onClick={handleToggleLogin}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 border ${
                isLoggedIn
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                  : "bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100"
              }`}
            >
              {isLoggedIn ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Trạng thái: Đã Đăng Nhập (Có Token)</span>
                  <LogOut className="w-3.5 h-3.5 ml-1 text-slate-400" />
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Trạng thái: Chưa Đăng Nhập (Token null)</span>
                  <LogIn className="w-3.5 h-3.5 ml-1 text-rose-600" />
                </>
              )}
            </button>

            {/* Proof modal button */}
            <button
              onClick={() => setIsProofModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Xem Bằng Chứng Headers</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Banner Alert */}
        {bannerAlert && (
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 animate-fade-in text-xs ${
              bannerAlert.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : bannerAlert.type === "trap"
                ? "bg-amber-50 border-amber-200 text-amber-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {bannerAlert.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : bannerAlert.type === "trap" ? (
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="font-medium leading-relaxed">{bannerAlert.message}</div>
          </div>
        )}

        {/* Action Controls Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFetchCustomers}
              disabled={loading}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === "customers"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Gọi GET /customers</span>
            </button>

            <button
              onClick={handleFetchStats}
              disabled={loading}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === "stats"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Gọi GET /deal-stats</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-medium text-slate-700">Interceptor Logic:</span>
            <code className="bg-slate-100 px-2 py-1 rounded text-[11px] font-mono text-teal-800">
              config.headers.Authorization = `Bearer $&#123;token&#125;`
            </code>
          </div>
        </div>

        {/* Live Network Headers Inspector */}
        <NetworkHeaderInspector inspection={inspection} />

        {/* CRM Data Display */}
        {activeTab === "customers" ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Danh Sách Khách Hàng CRM Doanh Nghiệp
                </h3>
                <p className="text-xs text-slate-500">
                  Dữ liệu được bảo vệ bằng JWT Token qua Request Interceptor
                </p>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {customers.length} khách hàng
              </span>
            </div>

            {customers.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Không thể hiển thị dữ liệu do chưa được cấp quyền (401 Unauthorized). Hãy Đăng nhập để xem!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-100">
                    <tr>
                      <th className="p-4">Mã KH</th>
                      <th className="p-4">Khách hàng / Doanh nghiệp</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Điện thoại</th>
                      <th className="p-4">Phân hạng</th>
                      <th className="p-4 text-right">Giá trị Hợp đồng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-mono font-medium text-slate-600">{c.id}</td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.company}</div>
                        </td>
                        <td className="p-4 font-mono text-slate-600">{c.email}</td>
                        <td className="p-4 font-mono text-slate-600">{c.phone}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              c.status === "VIP"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : c.status === "Customer"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-teal-700">
                          {c.dealValue.toLocaleString("vi-VN")} ₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-teal-600" />
                  <span>Tổng Doanh Thu Hợp Đồng</span>
                </div>
                <div className="text-xl font-bold text-slate-900 font-mono">
                  {stats.totalRevenue.toLocaleString("vi-VN")} ₫
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Leads Đang Xử Lý</span>
                </div>
                <div className="text-xl font-bold text-slate-900 font-mono">
                  {stats.activeLeads} khách hàng
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Tỷ Lệ Chốt Deal</span>
                </div>
                <div className="text-xl font-bold text-emerald-600 font-mono">
                  {stats.conversionRate}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>Lĩnh Vực Trọng Điểm</span>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {stats.topSector}
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Proof Modal */}
      <ProofModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
      />
    </div>
  );
}
