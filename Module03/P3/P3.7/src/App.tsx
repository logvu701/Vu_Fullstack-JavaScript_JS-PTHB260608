import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Header } from './components/Header';
import { CustomerTableSolution1 } from './components/CustomerTableSolution1';
import { CustomerTableSolution2 } from './components/CustomerTableSolution2';
import { UXComparisonModal } from './components/UXComparisonModal';

import { fetchCustomers } from './api/customerApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function CustomerAppContent() {
  const [solution, setSolution] = useState<'solution1' | 'solution2'>('solution2');
  const [isDocOpen, setIsDocOpen] = useState(false);

  // Query Khách hàng với refetch ngầm
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['customers-list'],
    queryFn: fetchCustomers,
    refetchInterval: 1000 * 60 * 10, // 10 phút tự động refetch ngầm
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header
        solution={solution}
        setSolution={setSolution}
        onTriggerBackgroundRefetch={() => refetch()}
        onOpenDoc={() => setIsDocOpen(true)}
        isFetching={isFetching}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6 w-full">
        {/* Banner Hero */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Quản trị Khách hàng & Phân tích Trạng thái Tải dữ liệu
          </h2>
          <p className="text-xs text-slate-400">
            Phân biệt rạch ròi giữa <code>isLoading</code> (Tải lần đầu) và <code>isFetching</code> (Tải ngầm) để tối ưu trải nghiệm người dùng
          </p>
        </div>

        {/* Dynamic Solution View */}
        {solution === 'solution1' ? (
          <CustomerTableSolution1 data={data} isLoading={isLoading} isFetching={isFetching} />
        ) : (
          <CustomerTableSolution2 data={data} isLoading={isLoading} isFetching={isFetching} />
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 7: Phân tích UX Trạng thái Tải dữ liệu (isLoading vs isFetching).
      </footer>

      {/* UX Comparison Report Modal */}
      <UXComparisonModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerAppContent />
    </QueryClientProvider>
  );
}

export default App;
