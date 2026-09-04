import React from 'react';
import type { InventoryItem } from '../types/inventory';
import { Package, AlertTriangle, XCircle, DollarSign, CheckCircle2 } from 'lucide-react';

interface InventoryStatsCardsProps {
  items: InventoryItem[];
}

export const InventoryStatsCards: React.FC<InventoryStatsCardsProps> = ({ items }) => {
  const totalSkus = items.length;
  const outOfStockCount = items.filter((i) => i.quantity === 0).length;
  const lowStockCount = items.filter((i) => i.quantity > 0 && i.quantity <= i.minThreshold).length;
  const inStockCount = items.filter((i) => i.quantity > i.minThreshold).length;
  const totalValue = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total SKUs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium">Tổng Mã Hàng (SKUs)</p>
          <p className="text-2xl font-extrabold text-slate-100">{totalSkus}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{inStockCount} mã tồn an toàn</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
          <Package className="w-6 h-6" />
        </div>
      </div>

      {/* Low Stock Warning */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium">Sắp Hết Hàng (&le; Min)</p>
          <p className="text-2xl font-extrabold text-amber-400">{lowStockCount}</p>
          <p className="text-[11px] text-amber-400/80">Cần tạo phiếu nhập bổ sung</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      {/* Out of Stock */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium">Cháy Hàng (Tồn = 0)</p>
          <p className="text-2xl font-extrabold text-rose-400">{outOfStockCount}</p>
          <p className="text-[11px] text-rose-400/80">Tạm ngừng nhận đơn</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center">
          <XCircle className="w-6 h-6" />
        </div>
      </div>

      {/* Total Asset Value */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium">Tổng Giá Trị Tồn Kho</p>
          <p className="text-xl font-extrabold text-emerald-400 font-mono">
            {totalValue.toLocaleString('vi-VN')} ₫
          </p>
          <p className="text-[11px] text-slate-400">Định giá theo đơn giá nhập</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
