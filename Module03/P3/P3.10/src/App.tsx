import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useInventoryStore } from './store/useInventoryStore';
import { fetchInventoryApi, resetMockInventory } from './api/inventoryApi';
import { Header } from './components/Header';
import { InventoryStatsCards } from './components/InventoryStatsCards';
import { InventoryFilterBar } from './components/InventoryFilterBar';
import { InventoryTable } from './components/InventoryTable';
import { EditInventorySidebar } from './components/EditInventorySidebar';
import { DataFlowDiagramModal } from './components/DataFlowDiagramModal';
import { ToastContainer } from './components/ToastContainer';

export function App() {
  const queryClient = useQueryClient();
  const { addToast } = useInventoryStore();
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);

  // Fetch all items for global stats summary
  const { data: allItems = [] } = useQuery({
    queryKey: ['inventory', { search: '', category: 'All' }],
    queryFn: () => fetchInventoryApi('', 'All'),
  });

  const handleResetData = () => {
    resetMockInventory();
    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    addToast({
      type: 'info',
      message: '🔄 Đã khôi phục dữ liệu tồn kho mẫu!',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Global Toast Queue */}
      <ToastContainer />

      {/* Header */}
      <Header
        onResetData={handleResetData}
        onOpenFlowModal={() => setIsFlowModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* KPI & Stats Overview */}
        <InventoryStatsCards items={allItems} />

        {/* Filter & Search Bar (Controlled by Zustand) */}
        <InventoryFilterBar />

        {/* Inventory Data Table (Controlled by TanStack Query) */}
        <InventoryTable />
      </main>

      {/* Slide-over Drawer for Quantity Adjustment */}
      <EditInventorySidebar />

      {/* Technical Architecture Flow Diagram Modal */}
      <DataFlowDiagramModal
        isOpen={isFlowModalOpen}
        onClose={() => setIsFlowModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy — Hoàn thành Bài 10: Quản lý Tồn kho End-to-End (Zustand + TanStack Query).
      </footer>
    </div>
  );
}

export default App;
