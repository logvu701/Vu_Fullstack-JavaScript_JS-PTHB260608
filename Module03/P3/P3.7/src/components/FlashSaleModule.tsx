import React, { useState } from 'react';
import { Zap, Flame, ShoppingCart, Lock, RotateCcw, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

interface FlashSaleItem {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  stock: number;
  sold: number;
  image: string;
}

const INITIAL_DEALS: FlashSaleItem[] = [
  {
    id: 'f-1',
    name: 'Khóa học React 19 Next-Gen Architecture',
    originalPrice: 2990000,
    salePrice: 990000,
    stock: 20,
    sold: 16,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'f-2',
    name: 'Mastering TypeScript & Advanced Generics',
    originalPrice: 1990000,
    salePrice: 690000,
    stock: 15,
    sold: 12,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'f-3',
    name: 'Docker & Kubernetes Cloud Engineering',
    originalPrice: 2490000,
    salePrice: 890000,
    stock: 25,
    sold: 21,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
  },
];

export const FlashSaleModule: React.FC = () => {
  const [deals, setDeals] = useState<FlashSaleItem[]>(INITIAL_DEALS);
  const [cartCount, setCartCount] = useState(0);

  // Hook useCountdown cho Flash Sale 180s (3 phút)
  const {
    timeLeft,
    isExpired,
    hours,
    minutes,
    seconds,
    reset,
    start,
  } = useCountdown({
    initialSeconds: 180,
    autoStart: true,
  });

  const handleBuy = (id: string) => {
    if (isExpired) return;
    setDeals((prev) =>
      prev.map((item) =>
        item.id === id && item.stock > 0
          ? { ...item, stock: item.stock - 1, sold: item.sold + 1 }
          : item
      )
    );
    setCartCount((c) => c + 1);
  };

  const handleRestartSale = () => {
    setDeals(INITIAL_DEALS);
    setCartCount(0);
    reset(180);
    start();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Flash Sale Banner */}
      <div className={`p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-2xl ${
        isExpired
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950/40 border-rose-900/60'
          : 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-900/40 border-amber-500/40'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Sự kiện Giảm Giá Giới Hạn</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isExpired ? 'Sự Kiện Flash Sale Đã Kết Thúc' : 'Rikkei Flash Sale - Giảm Sốc Đến 70%'}
            </h2>
            <p className="text-xs text-slate-300">
              {isExpired
                ? 'Hết giờ khuyến mãi. Các khóa học đã quay trở về giá gốc.'
                : 'Chương trình chỉ áp dụng trong khoảng thời gian đếm ngược bên dưới.'}
            </p>
          </div>

          {/* Countdown Clock Cubes */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/90 border border-amber-500/30 flex items-center justify-center text-2xl font-black text-amber-400 font-mono shadow-inner">
                {String(hours).padStart(2, '0')}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Giờ</span>
            </div>
            <span className="text-2xl font-black text-amber-400 mb-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/90 border border-amber-500/30 flex items-center justify-center text-2xl font-black text-amber-400 font-mono shadow-inner">
                {String(minutes).padStart(2, '0')}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Phút</span>
            </div>
            <span className="text-2xl font-black text-amber-400 mb-4">:</span>
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-2xl bg-slate-800/90 border flex items-center justify-center text-2xl font-black font-mono shadow-inner transition-colors ${
                isExpired ? 'border-rose-500 text-rose-400' : 'border-amber-500/30 text-amber-400'
              }`}>
                {String(seconds).padStart(2, '0')}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Giây</span>
            </div>
          </div>
        </div>

        {/* Action button inside banner */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span>Đã thêm vào giỏ: <strong>{cartCount}</strong> khóa học</span>
          </div>

          <button
            onClick={handleRestartSale}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kích hoạt lại Flash Sale (Reset 3 phút)</span>
          </button>
        </div>
      </div>

      {/* Deals List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((item) => {
          const discountRate = Math.round(((item.originalPrice - item.salePrice) / item.originalPrice) * 100);
          const percentSold = Math.round((item.sold / (item.sold + item.stock)) * 100);

          return (
            <div
              key={item.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isExpired
                  ? 'bg-slate-800/40 border-slate-700 opacity-60'
                  : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 hover:shadow-xl'
              }`}
            >
              <div className="relative h-44 bg-slate-900">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
                  -{discountRate}%
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white line-clamp-2">{item.name}</h4>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-base font-extrabold text-amber-400">
                      {formatCurrency(isExpired ? item.originalPrice : item.salePrice)}
                    </span>
                    {!isExpired && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Đã bán {item.sold}</span>
                    <span>Còn {item.stock} suất</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${percentSold}%` }} />
                  </div>
                </div>

                <button
                  disabled={isExpired || item.stock === 0}
                  onClick={() => handleBuy(item.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isExpired
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : item.stock === 0
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20'
                  }`}
                >
                  {isExpired ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Đã hết hạn Flash Sale</span>
                    </>
                  ) : item.stock === 0 ? (
                    <span>Hết suất ưu đãi</span>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Đăng ký Ngay</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
