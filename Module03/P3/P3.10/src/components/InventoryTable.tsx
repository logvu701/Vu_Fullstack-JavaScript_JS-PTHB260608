import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useInventoryStore } from '../store/useInventoryStore';
import { fetchInventoryApi } from '../api/inventoryApi';
import type { InventoryItem } from '../types/inventory';
import {
  SlidersHorizontal,
  MapPin,
  Clock,
  Loader2,
  RefreshCw,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Tag,
} from 'lucide-react';

export const InventoryTable: React.FC = () => {
  const { searchQuery, categoryFilter, openSidebar } = useInventoryStore();

  // TanStack Query Server State
  const {
    data: items = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['inventory', { search: searchQuery, category: categoryFilter }],
    queryFn: () => fetchInventoryApi(searchQuery, categoryFilter),
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100">Bảng Quản Lý Tồn Kho Theo Thời Gian Thực</h2>
            {isFetching && !isLoading && (
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-medium animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                Đồng bộ Server Cache...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Dữ liệu Server State quản lý bởi TanStack Query. Bấm <strong className="text-cyan-400">"Điều chỉnh"</strong> để kích hoạt Client Sidebar qua Zustand.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Làm mới</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-sm text-slate-400">Đang tải dữ liệu kho từ máy chủ...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
          <Tag className="w-8 h-8 mx-auto text-slate-600 mb-2" />
          <p className="text-sm">Không tìm thấy sản phẩm nào khớp với bộ lọc!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 font-medium border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">SKU & Tên Sản Phẩm</th>
                <th className="py-3.5 px-4">Danh Mục</th>
                <th className="py-3.5 px-4">Số Lượng Tồn</th>
                <th className="py-3.5 px-4">Đơn Giá Nhập</th>
                <th className="py-3.5 px-4">Vị Trí Lưu Kho</th>
                <th className="py-3.5 px-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {items.map((item) => {
                const isOutOfStock = item.quantity === 0;
                const isLowStock = item.quantity > 0 && item.quantity <= item.minThreshold;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition duration-150 group"
                  >
                    {/* SKU & Name */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                          {item.sku}
                        </span>
                        <p className="font-bold text-slate-200 mt-1">{item.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>Cập nhật: {item.lastUpdated}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                    </td>

                    {/* Quantity & Status Badge */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-mono font-extrabold text-base text-slate-100">
                          {item.quantity}{' '}
                          <span className="text-xs font-normal text-slate-400">cái</span>
                        </div>
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                            <XCircle className="w-3 h-3" />
                            Hết hàng (0)
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                            <AlertTriangle className="w-3 h-3" />
                            Sắp hết (&le; {item.minThreshold})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Tồn an toàn
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="py-4 px-4 font-mono font-semibold text-slate-300">
                      {item.unitPrice.toLocaleString('vi-VN')} ₫
                    </td>

                    {/* Warehouse Location */}
                    <td className="py-4 px-4 text-xs font-mono text-slate-300">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>
                          Dãy {item.location.aisle} &bull; Kệ {item.location.shelf} &bull; Ô {item.location.bin}
                        </span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => openSidebar(item)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-md shadow-cyan-900/30"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Điều chỉnh</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
