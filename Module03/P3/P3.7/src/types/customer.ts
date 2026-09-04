export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Enterprise' | 'Pro' | 'Basic';
  totalSpent: number;
  lastActive: string;
  avatar: string;
}

export interface CustomerData {
  customers: Customer[];
  totalCount: number;
  lastUpdated: string;
}
