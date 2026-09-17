import React, { useState, useRef, useEffect } from "react";
import { searchProductsApi, isCancel, MOCK_PRODUCTS } from "./api/searchApi";
import { Product, SearchRequestEvent } from "./types/search";
import { SequenceDiagramModal } from "./components/SequenceDiagramModal";
import { RequestTimeline } from "./components/RequestTimeline";
import {
  Search,
  Sliders,
  GitBranch,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Star,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isSearching, setIsSearching] = useState(false);
  const [simulatedDelay, setSimulatedDelay] = useState(800);
  const [cancellationEnabled, setCancellationEnabled] = useState(true);
  const [events, setEvents] = useState<SearchRequestEvent[]>([]);
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const [abortCount, setAbortCount] = useState(0);

  // Reference to current active AbortController
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdCounter = useRef(1);

  // Search logic
  const handleSearchChange = async (query: string) => {
    setSearchTerm(query);
    const currentReqId = `#REQ-${requestIdCounter.current++}`;
    const startTime = Date.now();

    // 1. KỸ THUẬT HỦY REQUEST (NẾU ĐANG BẬT)
    if (cancellationEnabled && abortControllerRef.current) {
      // Chủ động gọi controller.abort() hủy request đang bay
      abortControllerRef.current.abort();

      // Cập nhật trạng thái của event cũ sang ABORTED
      setEvents((prev) =>
        prev.map((e) =>
          e.status === "PENDING"
            ? {
                ...e,
                status: "ABORTED",
                endTime: Date.now(),
                durationMs: Date.now() - e.startTime,
              }
            : e
        )
      );
      setAbortCount((prev) => prev + 1);
    }

    // Tạo controller mới cho request này
    const newController = new AbortController();
    abortControllerRef.current = newController;

    // Ghi nhận event mới vào timeline
    const newEvent: SearchRequestEvent = {
      id: currentReqId,
      query,
      startTime,
      simulatedDelay,
      status: "PENDING",
      isCanceledViaSignal: cancellationEnabled,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setIsSearching(true);

    try {
      // Gửi request API kèm signal (hoặc không signal nếu tắt chế độ)
      const data = await searchProductsApi(
        query,
        cancellationEnabled ? newController.signal : undefined,
        simulatedDelay
      );

      // Nếu thành công (không bị hủy)
      const endTime = Date.now();
      setProducts(data);
      setIsSearching(false);

      setEvents((prev) =>
        prev.map((e) =>
          e.id === currentReqId
            ? {
                ...e,
                status: "RESOLVED",
                endTime,
                durationMs: endTime - startTime,
                resultCount: data.length,
              }
            : e
        )
      );
    } catch (err: any) {
      // BẪY DỮ LIỆU: KIỂM TRA axios.isCancel()
      if (isCancel(err)) {
        // Hành vi hủy chủ động hợp lệ:
        // Tuyệt đối KHÔNG in console.error rác, KHÔNG hiển thị lỗi báo mạng hỏng lên giao diện!
        setEvents((prev) =>
          prev.map((e) =>
            e.id === currentReqId
              ? {
                  ...e,
                  status: "ABORTED",
                  endTime: Date.now(),
                  durationMs: Date.now() - startTime,
                }
              : e
          )
        );
        return;
      }

      // Lỗi mạng thật sự khác
      console.error("[Lỗi mạng thực sự]:", err);
      setIsSearching(false);
    }
  };

  // Quick preset queries simulation
  const runRapidTypingSimulation = () => {
    const sequence = ["i", "ip", "iph", "iphone"];
    sequence.forEach((text, index) => {
      setTimeout(() => {
        handleSearchChange(text);
      }, index * 200);
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setProducts(MOCK_PRODUCTS);
    setEvents([]);
    setAbortCount(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  P4.9 - Tối Ưu Hiệu Suất với Hủy Request (Cancellation)
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  AbortController & isCancel
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chống lỗi Race Condition • Quản lý tài nguyên mạng • Bắt lỗi CanceledError an toàn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Aborted Counter Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-medium">
              <span>Đã hủy:</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                {abortCount} requests
              </span>
            </div>

            {/* Sequence Diagram button */}
            <button
              onClick={() => setIsDiagramOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Sơ Đồ Tuần Tự (Sequence Diagram)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Controls Toolbar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Gõ nhanh để thử nghiệm hủy request (VD: i -> ip -> iph -> iphone)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
                autoFocus
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
              )}
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={runRapidTypingSimulation}
                className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mô Phỏng Gõ Siêu Nhanh (Rapid Input)</span>
              </button>

              <button
                onClick={handleClear}
                title="Khôi phục mặc định"
                className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Configuration Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            {/* Toggle Cancellation */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700">Chế độ Hủy Request:</span>
              <button
                onClick={() => setCancellationEnabled(!cancellationEnabled)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  cancellationEnabled
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {cancellationEnabled ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>BẬT: An Toàn (Chặn Race Condition)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>TẮT: Dễ Bị Race Condition (Lỗi Thời)</span>
                  </>
                )}
              </button>
            </div>

            {/* Latency slider */}
            <div className="flex items-center gap-3 w-full sm:w-72">
              <span className="text-slate-500 whitespace-nowrap">
                Độ trễ mạng: <strong className="font-mono text-slate-800">{simulatedDelay}ms</strong>
              </span>
              <input
                type="range"
                min="300"
                max="2000"
                step="100"
                value={simulatedDelay}
                onChange={(e) => setSimulatedDelay(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Timeline Component */}
        <RequestTimeline events={events} />

        {/* Search Results Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Kết Quả Tìm Kiếm Hiển Thị Trên Giao Diện</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Tìm thấy {products.length} sản phẩm
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] font-medium backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs line-clamp-2">
                      {p.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{p.rating}</span>
                      <span className="text-slate-400 ml-1">
                        • {p.inStock ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-emerald-600 text-sm font-mono">
                      {p.price.toLocaleString("vi-VN")} ₫
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {p.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sequence Diagram Modal */}
      <SequenceDiagramModal
        isOpen={isDiagramOpen}
        onClose={() => setIsDiagramOpen(false)}
      />
    </div>
  );
}
