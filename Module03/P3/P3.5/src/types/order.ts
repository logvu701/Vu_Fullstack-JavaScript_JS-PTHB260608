export type OrderStatus = 'All' | 'Pending' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  product: string;
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface FilterState {
  status: OrderStatus;
  searchQuery: string;
  minAmount: number;
  setStatus: (status: OrderStatus) => void;
  setSearchQuery: (query: string) => void;
  setMinAmount: (amount: number) => void;
  resetFilters: () => void;
}
