import type { Customer, CustomerData } from '../types/customer';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Tập đoàn Công nghệ FPT',
    email: 'contact@fpt.com.vn',
    phone: '024 7300 7300',
    plan: 'Enterprise',
    totalSpent: 125000000,
    lastActive: '5 phút trước',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'CUS-1002',
    name: 'Công ty Cổ phần Rikkeisoft',
    email: 'hr@rikkeisoft.com',
    phone: '024 3623 1686',
    plan: 'Enterprise',
    totalSpent: 280000000,
    lastActive: '12 phút trước',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'CUS-1003',
    name: 'VNG Corporation',
    email: 'enterprise@vng.com.vn',
    phone: '028 3962 3888',
    plan: 'Pro',
    totalSpent: 85000000,
    lastActive: '1 giờ trước',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'CUS-1004',
    name: 'Viettel Telecom',
    email: 'solutions@viettel.com.vn',
    phone: '1800 8098',
    plan: 'Enterprise',
    totalSpent: 420000000,
    lastActive: '2 giờ trước',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'CUS-1005',
    name: 'Techcombank Digital Lab',
    email: 'tech@techcombank.com.vn',
    phone: '1800 588 822',
    plan: 'Pro',
    totalSpent: 96000000,
    lastActive: 'Hôm qua',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
];

export const fetchCustomers = async (): Promise<CustomerData> => {
  // Giả lập độ trễ mạng 1200ms
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    customers: MOCK_CUSTOMERS,
    totalCount: MOCK_CUSTOMERS.length,
    lastUpdated: new Date().toLocaleTimeString(),
  };
};
