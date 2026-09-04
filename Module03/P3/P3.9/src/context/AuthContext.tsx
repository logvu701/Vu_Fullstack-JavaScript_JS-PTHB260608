import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  student: {
    id: 'u-std-1',
    name: 'Nguyễn Văn Học Viên',
    email: 'student@rikkei.edu.vn',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  instructor: {
    id: 'u-inst-1',
    name: 'Thầy Hoàng Nam (Giảng viên)',
    email: 'nam.hoang@rikkei.edu.vn',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  admin: {
    id: 'u-adm-1',
    name: 'Quản trị viên Hệ thống',
    email: 'admin@rikkei.edu.vn',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rikkei_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (role: UserRole = 'student') => {
    const selectedUser = DEMO_USERS[role];
    setUser(selectedUser);
    localStorage.setItem('rikkei_auth_user', JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rikkei_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
