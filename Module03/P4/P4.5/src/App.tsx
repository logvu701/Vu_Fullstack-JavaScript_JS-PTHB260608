import React, { useEffect, useState, useMemo } from "react";
import {
  getContacts,
  addContact,
  deleteContact,
  API_BASE_URL,
} from "./api/contactApi";
import { Contact, CreateContactInput, ApiLogEntry } from "./types/contact";
import { AddContactModal } from "./components/AddContactModal";
import { DeleteTrapTestModal } from "./components/DeleteTrapTestModal";
import { NetworkLogModal } from "./components/NetworkLogModal";
import {
  Users,
  UserPlus,
  Trash2,
  Phone,
  Mail,
  Search,
  RefreshCw,
  Server,
  AlertTriangle,
  Bug,
  Terminal,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Tất cả");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTrapModalOpen, setIsTrapModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [logs, setLogs] = useState<ApiLogEntry[]>([]);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error" | "warning", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const addLog = (log: Omit<ApiLogEntry, "id" | "timestamp">) => {
    const newLog: ApiLogEntry = {
      ...log,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
      setServerOnline(true);
      addLog({
        method: "GET",
        url: `${API_BASE_URL}/contacts`,
        status: 200,
        statusText: "OK",
        response: data,
      });
    } catch (err: any) {
      setServerOnline(false);
      addLog({
        method: "GET",
        url: `${API_BASE_URL}/contacts`,
        status: err.response?.status,
        statusText: err.response?.statusText,
        error: err.message,
      });
      showToast(
        "error",
        "Không thể kết nối Mock Server (cổng 3004). Vui lòng chạy lệnh: npm run server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Add Contact Handler
  const handleAddContact = async (input: CreateContactInput) => {
    setIsSubmitting(true);
    try {
      const created = await addContact(input);
      setContacts((prev) => [...prev, created]);
      addLog({
        method: "POST",
        url: `${API_BASE_URL}/contacts`,
        status: 201,
        statusText: "Created",
        payload: input,
        response: created,
      });
      showToast("success", `Đã thêm liên hệ "${created.name}" thành công!`);
    } catch (err: any) {
      addLog({
        method: "POST",
        url: `${API_BASE_URL}/contacts`,
        status: err.response?.status,
        error: err.message,
        payload: input,
      });
      showToast("error", `Thêm liên hệ thất bại: ${err.message}`);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Contact Handler
  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa liên hệ "${name}" (ID: ${id}) không?`)) {
      return;
    }

    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      addLog({
        method: "DELETE",
        url: `${API_BASE_URL}/contacts/${id}`,
        status: 200,
        statusText: "OK",
        response: { success: true, id },
      });
      showToast("success", `Đã xóa liên hệ "${name}" thành công!`);
    } catch (err: any) {
      addLog({
        method: "DELETE",
        url: `${API_BASE_URL}/contacts/${id}`,
        status: err.status || err.response?.status,
        statusText: err.response?.statusText,
        error: err.message,
        isTrap: err.isTrapCaught || err.status === 404,
      });
      showToast("error", err.message);
    }
  };

  // Trap Test Delete Handler
  const handleTrapDelete = async (id: string) => {
    try {
      const res = await deleteContact(id);
      // If by chance the ID existed
      setContacts((prev) => prev.filter((c) => c.id !== id));
      addLog({
        method: "DELETE",
        url: `${API_BASE_URL}/contacts/${id}`,
        status: 200,
        statusText: "OK",
        response: res,
      });
      showToast("success", `Đã xóa liên hệ ID: ${id}`);
      return res;
    } catch (err: any) {
      addLog({
        method: "DELETE",
        url: `${API_BASE_URL}/contacts/${id}`,
        status: err.status || err.response?.status || 404,
        statusText: err.response?.statusText || "Not Found",
        error: err.message,
        isTrap: true,
      });
      throw err;
    }
  };

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === "Tất cả" || c.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [contacts, searchQuery, selectedGroup]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl border flex items-center gap-3 animate-fade-in max-w-md ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : toast.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.5 - Quản Lý Danh Bạ & Mock Server
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Axios CRUD
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tích hợp json-server cổng 3004 • Xử lý bẫy lỗi 404 Not Found
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Server status pill */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                serverOnline
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-rose-50 border-rose-200 text-rose-700"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>
                {serverOnline ? "Mock Server: Online (:3004)" : "Mock Server: Offline"}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  serverOnline ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                }`}
              />
            </div>

            {/* View Logs */}
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Logs ({logs.length})</span>
            </button>

            {/* Test 404 Trap */}
            <button
              onClick={() => setIsTrapModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Bug className="w-3.5 h-3.5 text-amber-600" />
              <span>Bẫy Lỗi DELETE 404</span>
            </button>

            {/* Add Contact */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Thêm Liên Hệ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Server Setup Instructions Box (if server offline or always visible as banner) */}
        {!serverOnline && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900">
                  Mock Server chưa được khởi chạy ở cổng 3004!
                </h4>
                <p className="text-xs text-amber-700 mt-0.5">
                  Vui lòng mở một Terminal mới tại thư mục <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">P4.5</code> và chạy lệnh:
                </p>
                <div className="mt-1.5 font-mono text-xs bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg inline-block">
                  npm run server
                </div>
                <span className="text-[11px] text-amber-600 ml-2">
                  (Khởi chạy json-server db.json --port 3004)
                </span>
              </div>
            </div>
            <button
              onClick={fetchContacts}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors self-end md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Kiểm Tra Lại Kết Nối</span>
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, SĐT hoặc email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["Tất cả", "Đồng nghiệp", "Khách hàng", "Đối tác", "Gia đình", "Bạn bè", "Khác"].map(
              (group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedGroup === group
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {group}
                </button>
              )
            )}
            <button
              onClick={fetchContacts}
              title="Tải lại danh bạ"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors ml-auto md:ml-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">
              Không tìm thấy liên hệ nào
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không có dữ liệu phù hợp với bộ lọc hoặc danh bạ đang trống. Hãy thêm một liên hệ mới hoặc tải lại!
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Thêm Liên Hệ Đầu Tiên</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-500 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {contact.name}
                        </h4>
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium mt-0.5">
                          {contact.group}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      ID: {contact.id}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-mono font-medium text-slate-800">
                        {contact.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {contact.createdAt
                      ? new Date(contact.createdAt).toLocaleDateString("vi-VN")
                      : "Vừa tạo"}
                  </span>
                  <button
                    onClick={() => handleDeleteContact(contact.id, contact.name)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                    title="Xóa liên hệ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Xóa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddContact}
        loading={isSubmitting}
      />

      <DeleteTrapTestModal
        isOpen={isTrapModalOpen}
        onClose={() => setIsTrapModalOpen(false)}
        onExecuteDelete={handleTrapDelete}
      />

      <NetworkLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        logs={logs}
        onClearLogs={() => setLogs([])}
      />
    </div>
  );
}
