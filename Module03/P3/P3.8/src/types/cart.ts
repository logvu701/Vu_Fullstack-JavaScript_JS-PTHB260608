export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g., 20 for 20%, or 300000 for 300,000 VND
  minOrder?: number;
  description: string;
}

export interface CartState {
  items: Course[];
  appliedCoupon: Coupon | null;
  couponError: string | null;
  warningMessage: string | null;
  successMessage: string | null;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  actionLog: {
    id: string;
    actionType: string;
    timestamp: string;
    detail: string;
  }[];
}

/**
 * MA TRẬN DISCRIMINATED UNION CHO CÁC ACTIONS:
 * Sử dụng trường 'type' làm Discriminant duy nhất.
 * Mỗi action có Payload tương ứng được kiểm soát kiểu chặt chẽ tại compile-time.
 */
export type CartAction =
  | {
      type: 'ADD_ITEM';
      payload: Course;
    }
  | {
      type: 'REMOVE_ITEM';
      payload: {
        courseId: string;
      };
    }
  | {
      type: 'APPLY_COUPON';
      payload: {
        coupon: Coupon;
      };
    }
  | {
      type: 'APPLY_COUPON_FAIL';
      payload: {
        errorMessage: string;
      };
    }
  | {
      type: 'REMOVE_COUPON';
    }
  | {
      type: 'CLEAR_CART';
    }
  | {
      type: 'DISMISS_ALERT';
    };
