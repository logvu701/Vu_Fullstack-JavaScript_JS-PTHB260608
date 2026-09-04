import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Header } from './components/Header';
import { CacheLifecycleVisualizer } from './components/CacheLifecycleVisualizer';
import { RevenueTab } from './components/RevenueTab';
import { StaffTab } from './components/StaffTab';
import { CacheDocModal } from './components/CacheDocModal';

import { fetchRevenueStats, fetchStaffStats } from './api/dashboardApi';

const STALE_TIME_MS = 5 * 60 * 1000; // 5 phút (300,000ms)
const GC_TIME_MS = 10 * 60 * 1000; // 10 phút

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
      refetchOnWindowFocus: false,
    },
  },
});

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'staff'>('revenue');
  const [isDocOpen, setIsDocOpen] = useState(false);

  // Query Doanh Thu với staleTime 5 phút
  const {
    data: revenueData,
    isLoading: isRevenueLoading,
    isFetching: isRevenueFetching,
    dataUpdatedAt: revenueUpdatedAt,
    refetch: refetchRevenue,
  } = useQuery({
    queryKey: ['revenue-stats'],
    queryFn: fetchRevenueStats,
  });

  // Query Nhân Sự
  const {
    data: staffData,
    isLoading: isStaffLoading,
    isFetching: isStaffFetching,
    refetch: refetchStaff,
  } = useQuery({
    queryKey: ['staff-stats'],
    queryFn: fetchStaffStats,
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDoc={() => setIsDocOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6 w-full">
        {/* Live Cache Lifecycle Visualizer Monitor */}
        <CacheLifecycleVisualizer
          isFetching={isRevenueFetching}
          dataUpdatedAt={revenueUpdatedAt}
          staleTimeMs={STALE_TIME_MS}
        />

        {/* Tab Content */}
        {activeTab === 'revenue' && (
          <RevenueTab
            data={revenueData}
            isLoading={isRevenueLoading}
            isFetching={isRevenueFetching}
            onForceRefresh={() => refetchRevenue()}
          />
        )}

        {activeTab === 'staff' && (
          <StaffTab
            data={staffData}
            isLoading={isStaffLoading}
            isFetching={isStaffFetching}
            onRefresh={() => refetchStaff()}
          />
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 6: Quản lý Vòng đời Cache (StaleTime vs Background Refetch).
      </footer>

      <CacheDocModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}

export default App;
