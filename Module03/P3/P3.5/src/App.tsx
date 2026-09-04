import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { OrderTable } from './components/OrderTable';
import { ArchitectureFlowModal } from './components/ArchitectureFlowModal';

import { useFilterStore } from './store/useFilterStore';
import { fetchOrders } from './api/orderApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 phút
      refetchOnWindowFocus: false,
    },
  },
});

function OrderDashboardContent() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);

  // 1. Đọc Client State từ Zustand Store
  const { status, searchQuery, minAmount } = useFilterStore();

  // 2. Chèn trực tiếp Zustand State vào queryKey của TanStack Query
  // KHI BẤT KỲ GIÁ TRỊ NÀO THAY ĐỔI -> TANSTACK QUERY TỰ ĐỘNG NHẬN DIỆN VÀ GỌI LẠI API (NO USEEFFECT NEEDED!)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['orders', { status, search: searchQuery, minAmount }],
    queryFn: () => fetchOrders(status, searchQuery, minAmount),
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header onOpenFlow={() => setIsFlowOpen(true)} isFetching={isFetching} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6 w-full">
        {/* Banner Hero */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Quản trị Đơn Hàng & Phân hệ Lọc Thời Gian Thực
          </h2>
          <p className="text-xs text-slate-400">
            Tích hợp Zustand Client State và TanStack Query Server State theo kiến trúc phân quyền Đại Thống Nhất
          </p>
        </div>

        {/* Thanh lọc trạng thái và tìm kiếm */}
        <FilterBar />

        {/* Bảng hiển thị danh sách đơn hàng */}
        <OrderTable orders={data?.orders || []} isLoading={isLoading} isFetching={isFetching} />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 5: Đồng bộ Client State (Zustand) & Server State (TanStack Query).
      </footer>

      {/* Architecture Flow Modal */}
      <ArchitectureFlowModal isOpen={isFlowOpen} onClose={() => setIsFlowOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderDashboardContent />
    </QueryClientProvider>
  );
}

export default App;
