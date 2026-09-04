import React from 'react';
import { Scale, CheckCircle, XCircle, Code, ShieldCheck, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase">
          <Scale className="w-4 h-4 text-teal-400" />
          <span>Phân tích & Đánh giá Cấu trúc Return Type</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Bảng So sánh 2 Giải pháp Thiết kế Custom Hook
        </h2>
        <p className="text-xs text-slate-400">
          So sánh toàn diện giữa Return dạng <strong>Object</strong> và Return dạng <strong>Tuple với `as const`</strong>.
        </p>
      </div>

      {/* Code Snippets Side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Solution 1 */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-indigo-400">Giải pháp 1: Object Return</h4>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
              Pattern Lựa chọn
            </span>
          </div>
          <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
{`// 1. Định nghĩa Return Type dạng Object
interface UseCountdownReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (seconds?: number) => void;
  formattedTime: string;
}

// 2. Cách sử dụng ở Consumer
const {
  timeLeft,
  isRunning,
  start,
  pause
} = useCountdown({ initialSeconds: 60 });`}
          </pre>
        </div>

        {/* Solution 2 */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-teal-400">Giải pháp 2: Tuple Const Assertion</h4>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
              React useState Pattern
            </span>
          </div>
          <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
{`// 1. Định nghĩa Return Type dạng Tuple
type UseCountdownTupleReturn = readonly [
  number,
  CountdownActions
];

return [timeLeft, { start, pause, reset }] as const;

// 2. Cách sử dụng ở Consumer
const [
  quizTime,
  { start: startQuiz, pause: pauseQuiz }
] = useCountdownTuple(60);`}
          </pre>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-800/60 shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900/80 text-slate-300">
              <th className="p-4 font-bold">Tiêu chí Đánh giá</th>
              <th className="p-4 font-bold text-indigo-400">Giải pháp 1: Object Return</th>
              <th className="p-4 font-bold text-teal-400">Giải pháp 2: Tuple (as const)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-slate-300">
            <tr>
              <td className="p-4 font-semibold text-white">1. Khả năng mở rộng (Extensibility)</td>
              <td className="p-4 text-emerald-400 font-medium">
                ✅ Rất cao. Có thể thêm 10 thuộc tính mới (progress, hours, addSeconds...) mà không làm vỡ code cũ của consumer.
              </td>
              <td className="p-4 text-amber-400">
                ⚠️ Thấp. Nếu thêm phần tử vào Tuple, các component cũ destructure theo thứ tự mảng sẽ bị sai lệch vị trí index.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white">2. An toàn kiểu (Type-Safety)</td>
              <td className="p-4 text-emerald-400 font-medium">
                ✅ Tuyệt đối. TypeScript tự động gợi ý đúng tên thuộc tính (Intellisense), autocomplete chính xác.
              </td>
              <td className="p-4 text-emerald-400 font-medium">
                ✅ Tốt khi dùng `as const`. Nếu quên `as const`, TS sẽ infer thành `(number | Actions)[]`.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white">3. Tùy chọn lấy thuộc tính (Selective Pick)</td>
              <td className="p-4 text-emerald-400 font-medium">
                ✅ Có thể destructure chỉ duy nhất <code>&#123; timeLeft &#125;</code> mà không cần lấy controls khác.
              </td>
              <td className="p-4 text-rose-400">
                ❌ Buộc phải destructure phần tử đầu tiên nếu muốn lấy controls ở phần tử thứ 2: <code>[, controls]</code>.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white">4. Đổi tên biến khi gọi nhiều lần trong 1 component</td>
              <td className="p-4 text-amber-400">
                ⚠️ Cần dùng alias khi destructure: <code>&#123; timeLeft: quizTime &#125;</code>.
              </td>
              <td className="p-4 text-emerald-400 font-medium">
                ✅ Cực kỳ linh hoạt, tự đặt tên theo ý muốn như `useState`: <code>[timeA], [timeB]</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Final Decision & Conclusion */}
      <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-teal-950/40 border border-indigo-700/60 rounded-3xl space-y-3">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          Quyết định Lựa chọn Kiến trúc:
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          👉 <strong>Lựa chọn Giải pháp 1 (Object Return)</strong> làm kiến trúc chính cho <code>useCountdown</code> vì Custom Hook đếm ngược có nhiều trạng thái và phương thức điều khiển phức tạp (<code>timeLeft</code>, <code>isRunning</code>, <code>isExpired</code>, <code>formattedTime</code>, <code>progressPercent</code>, <code>start</code>, <code>pause</code>, <code>reset</code>, <code>addSeconds</code>). Cấu trúc Object đảm bảo tính mở rộng cao nhất và trải nghiệm phát triển (DX) rõ ràng, tường minh.
        </p>
      </div>
    </div>
  );
};
