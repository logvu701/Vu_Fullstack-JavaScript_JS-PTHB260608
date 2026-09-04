import type { CartState, CartAction, Course, Coupon } from '../types/cart';

/**
 * Pure helper tính toán subtotal, discountAmount và finalTotal
 */
export const calculateCartTotals = (
  items: Course[],
  coupon: Coupon | null
): { subtotal: number; discountAmount: number; finalTotal: number } => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  let discountAmount = 0;

  if (coupon && subtotal >= (coupon.minOrder || 0)) {
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discountAmount = Math.min(subtotal, coupon.value);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return { subtotal, discountAmount, finalTotal };
};

export const initialCartState: CartState = {
  items: [],
  appliedCoupon: null,
  couponError: null,
  warningMessage: null,
  successMessage: null,
  subtotal: 0,
  discountAmount: 0,
  finalTotal: 0,
  actionLog: [
    {
      id: 'init',
      actionType: 'INITIALIZE',
      timestamp: new Date().toLocaleTimeString(),
      detail: 'Giỏ hàng đã sẵn sàng (0 khóa học)',
    },
  ],
};

/**
 * Pure Reducer xử lý mọi biến đổi trạng thái của Giỏ hàng:
 * Tuân thủ tuyệt đối tính Pure Function: không mutate state trực tiếp, trả về object state mới.
 */
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  const now = new Date().toLocaleTimeString();

  switch (action.type) {
    case 'ADD_ITEM': {
      const courseToAdd = action.payload;

      // BẪY DỮ LIỆU: Ràng buộc toàn vẹn dữ liệu
      // Kiểm tra xem khóa học đã có trong giỏ hàng hay chưa
      const isAlreadyInCart = state.items.some((item) => item.id === courseToAdd.id);

      if (isAlreadyInCart) {
        // TỪ CHỐI THÊM: Không làm thay đổi mảng items, chỉ gắn thông báo cảnh báo
        return {
          ...state,
          warningMessage: `⚠️ Khóa học "${courseToAdd.title}" đã có trong giỏ hàng! Mỗi khóa học chỉ cần mua 1 lần.`,
          successMessage: null,
          couponError: null,
          actionLog: [
            {
              id: `${Date.now()}-reject`,
              actionType: 'ADD_ITEM [REJECTED]',
              timestamp: now,
              detail: `Từ chối thêm trùng: "${courseToAdd.title}"`,
            },
            ...state.actionLog.slice(0, 15),
          ],
        };
      }

      const nextItems = [...state.items, courseToAdd];
      const { subtotal, discountAmount, finalTotal } = calculateCartTotals(
        nextItems,
        state.appliedCoupon
      );

      return {
        ...state,
        items: nextItems,
        subtotal,
        discountAmount,
        finalTotal,
        warningMessage: null,
        successMessage: `✅ Đã thêm "${courseToAdd.title}" vào giỏ hàng thành công!`,
        couponError: null,
        actionLog: [
          {
            id: `${Date.now()}-add`,
            actionType: 'ADD_ITEM',
            timestamp: now,
            detail: `Thêm khóa học: "${courseToAdd.title}"`,
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'REMOVE_ITEM': {
      const { courseId } = action.payload;
      const targetCourse = state.items.find((i) => i.id === courseId);
      const nextItems = state.items.filter((item) => item.id !== courseId);

      // Nếu sau khi xóa, subtotal không còn đủ điều kiện minOrder của coupon, huỷ coupon
      let nextCoupon = state.appliedCoupon;
      let couponErr = state.couponError;

      const subtotalWithoutCoupon = nextItems.reduce((sum, item) => sum + item.price, 0);
      if (nextCoupon && nextCoupon.minOrder && subtotalWithoutCoupon < nextCoupon.minOrder) {
        const requiredMin = nextCoupon.minOrder;
        nextCoupon = null;
        couponErr = `Mã giảm giá đã bị gỡ vì tổng đơn dưới mức tối thiểu ${new Intl.NumberFormat('vi-VN').format(requiredMin)}đ`;
      }

      const { subtotal, discountAmount, finalTotal } = calculateCartTotals(
        nextItems,
        nextCoupon
      );

      return {
        ...state,
        items: nextItems,
        appliedCoupon: nextCoupon,
        couponError: couponErr,
        subtotal,
        discountAmount,
        finalTotal,
        warningMessage: null,
        successMessage: `Đã xóa khóa học khỏi giỏ hàng.`,
        actionLog: [
          {
            id: `${Date.now()}-remove`,
            actionType: 'REMOVE_ITEM',
            timestamp: now,
            detail: `Xóa: "${targetCourse?.title || courseId}"`,
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'APPLY_COUPON': {
      const { coupon } = action.payload;

      if (state.items.length === 0) {
        return {
          ...state,
          couponError: 'Giỏ hàng đang trống, không thể áp dụng mã giảm giá.',
          warningMessage: null,
          successMessage: null,
        };
      }

      if (coupon.minOrder && state.subtotal < coupon.minOrder) {
        return {
          ...state,
          couponError: `Mã ${coupon.code} yêu cầu đơn hàng tối thiểu ${new Intl.NumberFormat('vi-VN').format(coupon.minOrder)}đ.`,
          warningMessage: null,
          successMessage: null,
        };
      }

      const { subtotal, discountAmount, finalTotal } = calculateCartTotals(
        state.items,
        coupon
      );

      return {
        ...state,
        appliedCoupon: coupon,
        couponError: null,
        subtotal,
        discountAmount,
        finalTotal,
        warningMessage: null,
        successMessage: `🎉 Áp dụng thành công mã giảm giá ${coupon.code}!`,
        actionLog: [
          {
            id: `${Date.now()}-coupon-apply`,
            actionType: 'APPLY_COUPON',
            timestamp: now,
            detail: `Áp dụng mã ${coupon.code} (${coupon.description})`,
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'APPLY_COUPON_FAIL': {
      return {
        ...state,
        couponError: action.payload.errorMessage,
        warningMessage: null,
        successMessage: null,
        actionLog: [
          {
            id: `${Date.now()}-coupon-err`,
            actionType: 'APPLY_COUPON [FAILED]',
            timestamp: now,
            detail: `Lỗi mã: ${action.payload.errorMessage}`,
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'REMOVE_COUPON': {
      const { subtotal, discountAmount, finalTotal } = calculateCartTotals(
        state.items,
        null
      );

      return {
        ...state,
        appliedCoupon: null,
        couponError: null,
        subtotal,
        discountAmount,
        finalTotal,
        warningMessage: null,
        successMessage: 'Đã gỡ bỏ mã giảm giá.',
        actionLog: [
          {
            id: `${Date.now()}-coupon-remove`,
            actionType: 'REMOVE_COUPON',
            timestamp: now,
            detail: 'Gỡ mã giảm giá',
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'CLEAR_CART': {
      return {
        ...initialCartState,
        actionLog: [
          {
            id: `${Date.now()}-clear`,
            actionType: 'CLEAR_CART',
            timestamp: now,
            detail: 'Xóa toàn bộ giỏ hàng',
          },
          ...state.actionLog.slice(0, 15),
        ],
      };
    }

    case 'DISMISS_ALERT': {
      return {
        ...state,
        warningMessage: null,
        successMessage: null,
        couponError: null,
      };
    }

    default:
      return state;
  }
};
