export interface Course {
  id: number;
  title: string;
  price: number; // Numeric value for calculations
  priceString: string; // Formatting string e.g. "1,200,000"
  banner: string;
  badge: string;
}

export interface CartState {
  items: Course[];
  promoCode: string | null;
  discountPercent: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'APPLY_PROMO'; payload: string }
  | { type: 'CLEAR_CART' };

export const initialState: CartState = {
  items: [],
  promoCode: null,
  discountPercent: 0,
  totalPrice: 0,
};

// Pure helper to calculate total price based on items and discount
const calculateTotal = (items: Course[], discountPercent: number): number => {
  const sum = items.reduce((acc, item) => acc + item.price, 0);
  return sum * (1 - discountPercent / 100);
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Data integrity guard: If course already exists, refuse to add
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        return state; // No state change
      }
      
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: calculateTotal(newItems, state.discountPercent),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalPrice: calculateTotal(newItems, state.discountPercent),
      };
    }
    
    case 'APPLY_PROMO': {
      const code = action.payload.toUpperCase().trim();
      let discount = 0;
      
      if (code === 'RIKKEI10') {
        discount = 10;
      } else if (code === 'RIKKEI20') {
        discount = 20;
      } else {
        // Invalid promo code, return current state
        return state;
      }
      
      return {
        ...state,
        promoCode: code,
        discountPercent: discount,
        totalPrice: calculateTotal(state.items, discount),
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        promoCode: null,
        discountPercent: 0,
        totalPrice: 0,
      };
    }
    
    default:
      return state;
  }
};
