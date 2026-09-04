import type { StateCreator } from 'zustand';
import type { UISlice, BoundStoreState, Toast } from '../../types/store';

export const createUISlice: StateCreator<
  BoundStoreState,
  [],
  [],
  UISlice
> = (set) => ({
  theme: 'dark',
  toasts: [],

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    }));
  },

  setTheme: (theme: 'dark' | 'light') => {
    set({ theme });
  },

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: Toast = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Tự động đóng toast sau thời gian duration (mặc định 4s)
    const duration = toast.duration || 4000;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
});
