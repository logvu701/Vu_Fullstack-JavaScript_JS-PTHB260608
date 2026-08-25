import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, FC } from 'react';

export interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: 'admin' | 'user') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from localStorage on startup
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('rikkei_auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
      // Clean corrupted storage
      localStorage.removeItem('rikkei_auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, role: 'admin' | 'user') => {
    const newUser: User = { username, role };
    setUser(newUser);
    localStorage.setItem('rikkei_auth_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    // Data Integrity rule: Completely prune obsolete/old auth tokens from local storage on logout
    localStorage.removeItem('rikkei_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
