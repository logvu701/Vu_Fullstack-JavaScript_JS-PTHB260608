import React from 'react';
import { Layers, ShieldCheck, CheckCircle, XCircle, Code, X } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 text-orange-600 rounded-2xl">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Báo cáo Kỹ thuật: Bài 8 - Điều phối Trạng thái Phức hợp (useReducer)
            </h3>
            <p className="text-xs text-slate-500">
              So sánh useState vs useReducer & Ma trận Discriminated Union Actions
            </p>
          </div>
        </div>

        {/* Comparison useState vs useReducer */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-800">
            1. So sánh useState lồng nhau vs useReducer:
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b">
                  <th className="p-3 font-bold">Tiêu chí</th>
                  <th className="p-3 font-bold text-rose-600">Nhiều useState rời rạc</th>
                  <th className="p-3 font-bold text-orange-600">useReducer (Khuyên dùng)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Tính đồng bộ dữ liệu</td>
                  <td className="p-3 text-rose-600">
                    Dễ bị Race Condition khi gọi liên tiếp `setItems()`, `setSubtotal()`, `setCoupon()` trong cùng handler.
                  </td>
                  <td className="p-3 text-emerald-600 font-medium">
                    Nguyên tử (Atomic): 1 action duy nhất tính toán lại toàn bộ `subtotal`, `discount`, `total` trong cùng 1 pure step.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Khả năng Test (Unit Test)</td>
                  <td className="p-3">
                    Phức tạp, phải render Component hoặc mock React hooks.
                  </td>
                  <td className="p-3 text-emerald-600 font-medium">
                    Cực kỳ dễ dàng: `cartReducer(state, action)` là pure function độc lập không phụ thuộc React runtime.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Bảo đảm toàn vẹn dữ liệu</td>
                  <td className="p-3">
                    Logic kiểm tra trùng lặp bị phân tán rải rác ở từng component con.
                  </td>
                  <td className="p-3 text-emerald-600 font-medium">
                    Tập trung tại Reducer: nếu item đã có trong cart, action ADD_ITEM bị reject an toàn mà không mutate state.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Discriminated Union Matrix */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-800">
            2. Ma trận Discriminated Union cho Cart Actions:
          </h4>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
{`export type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: { courseId: string } }
  | { type: 'APPLY_COUPON'; payload: { coupon: Coupon } }
  | { type: 'APPLY_COUPON_FAIL'; payload: { errorMessage: string } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'DISMISS_ALERT' };`}
          </pre>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};
