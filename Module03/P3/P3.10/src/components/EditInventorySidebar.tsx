import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInventoryStore } from '../store/useInventoryStore';
import { updateInventoryQuantityApi } from '../api/inventoryApi';
import type { AdjustmentType, UpdateInventoryPayload } from '../types/inventory';
import {
  X,
  SlidersHorizontal,
  Plus,
  Minus,
  RotateCcw,
  Save,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Bug,
  MapPin,
  Tag,
} from 'lucide-react';

export const EditInventorySidebar: React.FC = () => {
  const queryClient = useQueryClient();
  const { selectedItem, isSidebarOpen, closeSidebar, addToast } = useInventoryStore();

  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('add');
  const [inputValue, setInputValue] = useState<number>(10);
  const [reason, setReason] = useState<string>('Nhập hàng định kỳ từ nhà cung cấp');
  const [shouldSimulateError, setShouldSimulateError] = useState<boolean>(false);

  // Reset form khi đổi selectedItem
  useEffect(() => {
    if (selectedItem) {
      setAdjustmentType('add');
      setInputValue(10);
      setReason('Nhập hàng định kỳ từ nhà cung cấp');
    }
  }, [selectedItem]);

  // Tính toán số lượng tồn kho dự kiến sau khi điều chỉnh
  const currentQuantity = selectedItem?.quantity || 0;
  let nextQuantity = currentQuantity;
  if (adjustmentType === 'add') {
    nextQuantity = currentQuantity + (Number(inputValue) || 0);
  } else if (adjustmentType === 'subtract') {
    nextQuantity = currentQuantity - (Number(inputValue) || 0);
  } else if (adjustmentType === 'set') {
    nextQuantity = Number(inputValue) || 0;
  }

  // Client-side Validation Checks
  const isNegative = nextQuantity < 0;
  const isExceededQuota = nextQuantity > 10000;
  const isInvalidInput = isNaN(inputValue) || inputValue < 0 || isNegative || isExceededQuota;

  // TanStack Query Mutation
  const updateMutation = useMutation({
    mutationFn: (payload: UpdateInventoryPayload) =>
      updateInventoryQuantityApi(payload, shouldSimulateError),
    onSuccess: (updatedItem) => {
      // 1. Invalidate Server Cache
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      // 2. Close Client Zustand Sidebar
      closeSidebar();
      // 3. Trigger UI Toast
      addToast({
        type: 'success',
        message: `✅ [${updatedItem.sku}] Đã cập nhật tồn kho thành ${updatedItem.quantity} cái!`,
      });
    },
    onError: (err) => {
      addToast({
        type: 'error',
        message: (err as Error).message || 'Lỗi cập nhật máy chủ!',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || isInvalidInput) return;

    updateMutation.mutate({
      itemId: selectedItem.id,
      adjustmentType,
      value: Number(inputValue),
      reason,
    });
  };

  if (!isSidebarOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">Điều Chỉnh Tồn Kho</h2>
                  <p className="text-xs text-slate-400">Zustand Sidebar & TanStack Mutation</p>
                </div>
              </div>
              <button
                onClick={closeSidebar}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Product Summary Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {selectedItem.sku}
                </span>
                <span className="text-xs text-slate-400">{selectedItem.category}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">{selectedItem.name}</h3>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Tồn kho hiện tại:</span>
                <span className="font-mono font-extrabold text-slate-100 text-sm">
                  {currentQuantity} cái
                </span>
              </div>
            </div>

            {/* Adjustment Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Hình thức điều chỉnh
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustmentType('add')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                    adjustmentType === 'add'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nhập thêm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdjustmentType('subtract')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                    adjustmentType === 'subtract'
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Xuất bớt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdjustmentType('set')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                    adjustmentType === 'set'
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ghi đè</span>
                </button>
              </div>
            </div>

            {/* Number Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center justify-between">
                <span>Số lượng {adjustmentType === 'set' ? 'mới' : 'thay đổi'}</span>
                <span className="text-slate-500 font-normal">Định mức: 0 - 10,000</span>
              </label>
              <input
                type="number"
                min="0"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl font-mono text-sm text-slate-100 focus:outline-none transition ${
                  isNegative || isExceededQuota
                    ? 'border-rose-500 ring-1 ring-rose-500'
                    : 'border-slate-700 focus:border-cyan-500'
                }`}
              />
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Lý do điều chỉnh kho
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do xuất/nhập/kiểm kê..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Live Calculation & Validation Alert Box */}
            <div
              className={`p-4 rounded-xl border transition ${
                isNegative || isExceededQuota
                  ? 'bg-rose-950/30 border-rose-800 text-rose-300'
                  : 'bg-cyan-950/30 border-cyan-800 text-cyan-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold">Tồn kho sau điều chỉnh:</span>
                <span className="font-mono font-extrabold text-base">
                  {nextQuantity} cái
                </span>
              </div>

              {isNegative && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5 mt-2 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>BẪY LỖI: Số lượng tồn kho không thể nhỏ hơn 0!</span>
                </p>
              )}

              {isExceededQuota && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5 mt-2 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>BẪY LỖI: Vượt quá định mức tối đa 10,000 cái!</span>
                </p>
              )}

              {!isNegative && !isExceededQuota && (
                <p className="text-[11px] text-cyan-400 flex items-center gap-1.5 mt-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Hợp lệ: Sẵn sàng gửi TanStack Mutation lên Server.</span>
                </p>
              )}
            </div>

            {/* Simulate 500 Error Toggle */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-slate-300 font-medium">Mô phỏng Server Lỗi 500</span>
              </div>
              <input
                type="checkbox"
                checked={shouldSimulateError}
                onChange={(e) => setShouldSimulateError(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-900 border-slate-700"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center gap-3">
            <button
              type="button"
              onClick={closeSidebar}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isInvalidInput || updateMutation.isPending}
              className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Cập Nhật</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
