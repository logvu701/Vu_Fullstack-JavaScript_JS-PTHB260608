import React, { useState } from 'react';
import { ShieldAlert, Play, CheckCircle, HelpCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';

// Component này cố ý gọi useTheme() mà không được bọc bởi ThemeProvider
const UnsafeConsumer: React.FC = () => {
  // Vì nằm ngoài ThemeProvider, useTheme() sẽ throw Error("useTheme must be used within a ThemeProvider...")
  const { theme } = useTheme();

  return (
    <div className="p-4 bg-emerald-100 rounded-lg text-emerald-800">
      Nếu nhìn thấy dòng này nghĩa là component đã ở trong Provider: Theme = {theme}
    </div>
  );
};

interface DemoOutsideProviderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoOutsideProvider: React.FC<DemoOutsideProviderProps> = ({ isOpen, onClose }) => {
  const [triggerBug, setTriggerBug] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Phòng Thử nghiệm Bẫy Dữ liệu Context API
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kiểm tra cơ chế ném ngoại lệ khi Consumer nằm ngoài ThemeProvider
            </p>
          </div>
        </div>

        {/* Lý giải kỹ thuật */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            Vấn đề và Giải pháp:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>
              <strong>Nếu không xử lý ngoại lệ:</strong> Context mặc định sẽ là <code>undefined</code>. Khi gọi <code>const &#123; theme &#125; = useTheme()</code>, JS sẽ văng lỗi <em>"TypeError: Cannot destructure property 'theme' of undefined"</em> tại runtime, rất khó debug.
            </li>
            <li>
              <strong>Giải pháp triển khai:</strong> Trong <code>useTheme()</code>, nếu <code>context === undefined</code>, lập tức ném ra <code>new Error("useTheme must be used within a ThemeProvider...")</code> có chỉ dẫn giải quyết rõ ràng.
            </li>
          </ul>
        </div>

        {/* Khu vực tương tác */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Trạng thái Thử nghiệm:
            </span>
            <button
              onClick={() => setTriggerBug((prev) => !prev)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                triggerBug
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {triggerBug ? 'Hủy kích hoạt (Reset)' : 'Kích hoạt gọi Hook ngoài Provider'}
            </button>
          </div>

          <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-950/50 min-h-[120px] flex flex-col justify-center">
            {triggerBug ? (
              <ErrorBoundary fallbackTitle="[KẾT QUẢ TEST BẪY DỮ LIỆU THÀNH CÔNG] - Ngoại lệ được kiểm soát:">
                {/* Component này nằm hoàn toàn ngoài ThemeProvider */}
                <UnsafeConsumer />
              </ErrorBoundary>
            ) : (
              <div className="text-center py-4 text-slate-500 text-xs">
                Nhấn nút <strong>"Kích hoạt gọi Hook ngoài Provider"</strong> ở trên để xem cách hệ thống xử lý ngoại lệ an toàn.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
          >
            Đóng bảng thử nghiệm
          </button>
        </div>
      </div>
    </div>
  );
};
