export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Lead" | "Prospect" | "Customer" | "VIP";
  dealValue: number;
}

export interface DealStat {
  totalRevenue: number;
  activeLeads: number;
  conversionRate: string;
  topSector: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
  } | null;
  token: string | null;
}

export interface NetworkInspection {
  id: string;
  timestamp: string;
  url: string;
  method: string;
  requestHeaders: Record<string, string>;
  status?: number;
  statusText?: string;
  tokenInjected: boolean;
  responseData?: any;
  error?: string;
  isTrapCaught?: boolean;
}
