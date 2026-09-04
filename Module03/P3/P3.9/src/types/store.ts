export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface AuthSlice {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, role: UserRole, customToken?: string) => void;
  logout: () => void;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface UISlice {
  theme: 'dark' | 'light';
  toasts: Toast[];
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export type BoundStoreState = AuthSlice & UISlice;

export interface RequestInspectorLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headersSent: Record<string, string>;
  authHeaderAttached: boolean;
  authHeaderValue: string | null;
  status: number;
  statusText: string;
  responseBody: any;
  explanation: string;
}
