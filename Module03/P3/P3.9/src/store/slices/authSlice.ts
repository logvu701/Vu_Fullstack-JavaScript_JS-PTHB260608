import type { StateCreator } from 'zustand';
import type { AuthSlice, BoundStoreState, UserRole } from '../../types/store';

export const createAuthSlice: StateCreator<
  BoundStoreState,
  [],
  [],
  AuthSlice
> = (set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (username: string, role: UserRole, customToken?: string) => {
    const generatedToken =
      customToken ||
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ sub: username, role, exp: Date.now() + 3600000 })
      )}.simulated_sig_${Math.random().toString(36).substring(2, 8)}`;

    const userObj = {
      id: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
      username,
      name:
        role === 'admin'
          ? 'Quản Trị Viên Hệ Thống'
          : role === 'manager'
          ? 'Trưởng Phòng Kinh Doanh'
          : 'Chuyên Viên Vận Hành',
      role,
      avatar:
        role === 'admin'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
          : role === 'manager'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    };

    set({
      token: generatedToken,
      user: userObj,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
});
