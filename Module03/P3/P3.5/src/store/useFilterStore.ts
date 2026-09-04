import { create } from 'zustand';
import type { FilterState, OrderStatus } from '../types/order';

/**
 * ZUSTAND CLIENT STATE:
 * Quản lý trạng thái bộ lọc Đơn hàng.
 * 
 * BẪY DỮ LIỆU: Khách hàng có thể gõ khoảng trắng liên tục (VD: "   react   " hoặc "   ").
 * Hành động `setSearchQuery` phải tự động `.trim()` dữ liệu trước khi lưu vào store,
 * đảm bảo `queryKey` của TanStack Query không bị kích hoạt gọi API sai lệch hoặc gửi query rác.
 */
export const useFilterStore = create<FilterState>((set) => ({
  status: 'All',
  searchQuery: '',
  minAmount: 0,

  setStatus: (status: OrderStatus) => set({ status }),

  setSearchQuery: (query: string) => {
    // BẪY DỮ LIỆU: Làm sạch khoảng trắng ở tầng Zustand
    set({ searchQuery: query.trim() });
  },

  setMinAmount: (amount: number) => set({ minAmount: Math.max(0, amount) }),

  resetFilters: () =>
    set({
      status: 'All',
      searchQuery: '',
      minAmount: 0,
    }),
}));
