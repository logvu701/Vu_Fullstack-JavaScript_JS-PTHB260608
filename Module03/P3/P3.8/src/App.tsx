import React, { useReducer, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { CourseCatalog } from './components/CourseCatalog';
import { CartSection } from './components/CartSection';
import { ActionHistoryLog } from './components/ActionHistoryLog';
import { AnalysisModal } from './components/AnalysisModal';
import { cartReducer, initialCartState } from './reducer/cartReducer';
import { AVAILABLE_COURSES } from './data/mockData';
import type { Course, Coupon } from './types/cart';

export function App() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  // Set các ID khóa học đang có trong giỏ hàng để highlight nhanh
  const cartItemIds = useMemo(() => {
    return new Set(cartState.items.map((i) => i.id));
  }, [cartState.items]);

  // Action Dispatchers với Discriminated Union
  const handleAddToCart = (course: Course) => {
    dispatch({ type: 'ADD_ITEM', payload: course });
  };

  const handleRemoveItem = (courseId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { courseId } });
  };

  const handleApplyCoupon = (coupon: Coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: { coupon } });
  };

  const handleApplyCouponFail = (errorMessage: string) => {
    dispatch({ type: 'APPLY_COUPON_FAIL', payload: { errorMessage } });
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleDismissAlert = () => {
    dispatch({ type: 'DISMISS_ALERT' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header
        itemCount={cartState.items.length}
        onOpenAnalysis={() => setIsAnalysisOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Main Grid: Catalog on left, Cart on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <CourseCatalog
              courses={AVAILABLE_COURSES}
              cartItemIds={cartItemIds}
              onAddToCart={handleAddToCart}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <CartSection
              cartState={cartState}
              onRemoveItem={handleRemoveItem}
              onApplyCoupon={handleApplyCoupon}
              onApplyCouponFail={handleApplyCouponFail}
              onRemoveCoupon={handleRemoveCoupon}
              onClearCart={handleClearCart}
              onDismissAlert={handleDismissAlert}
            />
          </div>
        </div>

        {/* Timeline Log Section */}
        <ActionHistoryLog logs={cartState.actionLog} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 8: Điều phối trạng thái phức hợp với useReducer.
      </footer>

      {/* Analysis Modal */}
      <AnalysisModal isOpen={isAnalysisOpen} onClose={() => setIsAnalysisOpen(false)} />
    </div>
  );
}

export default App;
