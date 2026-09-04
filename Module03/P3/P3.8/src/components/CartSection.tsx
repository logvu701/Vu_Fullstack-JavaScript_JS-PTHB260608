import React, { useState } from 'react';
import { 
  ShoppingBag, Trash2, Tag, ArrowRight, AlertTriangle, CheckCircle2, 
  Sparkles, X, ShieldAlert, Percent, RefreshCw 
} from 'lucide-react';
import type { CartState, Coupon } from '../types/cart';
import { VALID_COUPONS } from '../data/mockData';

interface CartSectionProps {
  cartState: CartState;
  onRemoveItem: (courseId: string) => void;
  onApplyCoupon: (coupon: Coupon) => void;
  onApplyCouponFail: (errorMsg: string) => void;
  onRemoveCoupon: () => void;
  onClearCart: () => void;
  onDismissAlert: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cartState,
  onRemoveItem,
  onApplyCoupon,
  onApplyCouponFail,
  onRemoveCoupon,
  onClearCart,
  onDismissAlert,
}) => {
  const [couponInput, setCouponInput] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      onApplyCouponFail('Vui lòng nhập mã giảm giá.');
      return;
    }

    const found = VALID_COUPONS.find((c) => c.code === code);
    if (!found) {
      onApplyCouponFail(`Mã giảm giá "${code}" không tồn tại hoặc đã hết hạn.`);
      return;
    }

    onApplyCoupon(found);
    setCouponInput('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Title & Clear Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-orange-600" />
          Chi tiết Giỏ hàng ({cartState.items.length})
        </h3>
        {cartState.items.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa toàn bộ</span>
          </button>
        )}
      </div>

      {/* Warning / Error / Success Alerts */}
      {cartState.warningMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start justify-between gap-3 text-xs text-amber-800 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{cartState.warningMessage}</span>
          </div>
          <button onClick={onDismissAlert} className="text-amber-500 hover:text-amber-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {cartState.successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start justify-between gap-3 text-xs text-emerald-800 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{cartState.successMessage}</span>
          </div>
          <button onClick={onDismissAlert} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {cartState.couponError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start justify-between gap-3 text-xs text-rose-800 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{cartState.couponError}</span>
          </div>
          <button onClick={onDismissAlert} className="text-rose-500 hover:text-rose-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cart Items List */}
      {cartState.items.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-200 rounded-2xl space-y-2">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500">Giỏ hàng của bạn đang trống.</p>
          <p className="text-[11px] text-slate-400">Hãy chọn khóa học ở danh mục bên trái để thêm vào.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {cartState.items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 truncate">{item.title}</h4>
                  <div className="text-[11px] text-orange-600 font-extrabold">{formatCurrency(item.price)}</div>
                </div>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition"
                title="Xóa khỏi giỏ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Application Form */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-orange-600" />
          Mã giảm giá (Coupon):
        </label>

        {cartState.appliedCoupon ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 font-mono">
                  {cartState.appliedCoupon.code}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold">
                  {cartState.appliedCoupon.discountType === 'percentage'
                    ? `-${cartState.appliedCoupon.value}%`
                    : `-${formatCurrency(cartState.appliedCoupon.value)}`}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700">{cartState.appliedCoupon.description}</p>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50"
            >
              Gỡ mã
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Nhập mã (VD: RIKKEI20, GIAM500K, VIP50)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs uppercase font-mono text-slate-800 focus:outline-none focus:border-orange-500 transition"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0 shadow-sm"
            >
              Áp dụng
            </button>
          </form>
        )}

        {/* Suggest Coupons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 font-medium">Mã gợi ý:</span>
          {VALID_COUPONS.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onApplyCoupon(c)}
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition"
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Tạm tính (Subtotal):</span>
          <span className="font-semibold text-slate-800">{formatCurrency(cartState.subtotal)}</span>
        </div>

        {cartState.discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Giảm giá khuyến mãi:</span>
            <span>-{formatCurrency(cartState.discountAmount)}</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
          <span>Tổng thanh toán:</span>
          <span className="text-base text-orange-600 font-extrabold">
            {formatCurrency(cartState.finalTotal)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        disabled={cartState.items.length === 0}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold text-xs shadow-lg shadow-orange-500/20 disabled:shadow-none transition flex items-center justify-center gap-2"
      >
        <span>Tiến hành Thanh toán</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
