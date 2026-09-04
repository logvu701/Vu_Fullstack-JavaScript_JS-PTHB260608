export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
}
