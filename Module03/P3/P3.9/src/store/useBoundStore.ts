import { create } from 'zustand';
import type { BoundStoreState } from '../types/store';
import { createAuthSlice } from './slices/authSlice';
import { createUISlice } from './slices/uiSlice';

/**
 * Zustand Slices Pattern:
 * Gom các Slice Creator nhỏ thành 1 Bound Store duy nhất.
 * - Có thể dùng trong React: useBoundStore((state) => state.token)
 * - Có thể dùng ngoài React (Vanilla JS / Axios): useBoundStore.getState().token
 */
export const useBoundStore = create<BoundStoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
}));
