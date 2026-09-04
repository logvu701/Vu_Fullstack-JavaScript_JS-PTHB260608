import { create } from 'zustand';
import type { InventoryItem, InventoryCategory, ToastInfo } from '../types/inventory';

interface InventoryUIState {
  // Sidebar State
  selectedItem: InventoryItem | null;
  isSidebarOpen: boolean;
  openSidebar: (item: InventoryItem) => void;
  closeSidebar: () => void;

  // Filter & Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: InventoryCategory;
  setCategoryFilter: (category: InventoryCategory) => void;
  resetFilters: () => void;

  // Toast Queue
  toasts: ToastInfo[];
  addToast: (toast: Omit<ToastInfo, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useInventoryStore = create<InventoryUIState>((set) => ({
  // Sidebar State
  selectedItem: null,
  isSidebarOpen: false,
  openSidebar: (item) => set({ selectedItem: item, isSidebarOpen: true }),
  closeSidebar: () => set({ selectedItem: null, isSidebarOpen: false }),

  // Filter & Search State (Tự động trim khoảng trắng thừa)
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query.trim() }),
  categoryFilter: 'All',
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  resetFilters: () => set({ searchQuery: '', categoryFilter: 'All' }),

  // Toast Notifications
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
