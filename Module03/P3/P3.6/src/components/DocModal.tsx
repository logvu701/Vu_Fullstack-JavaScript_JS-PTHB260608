import React from 'react';
import { BookOpen, CheckCircle, Code, Globe, ShieldAlert, X } from 'lucide-react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/10 text-teal-600 rounded-2xl">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Báo cáo Nghiệp vụ: Bài 6 - Quản lý Trạng thái qua URL
            </h3>
            <p className="text-xs text-slate-500">
              Giải pháp useSearchParams, Đồng bộ hóa 2 chiều & Xử lý Tham số Rác
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              1. Tại sao quản lý State qua URL lại quan trọng?
            </h4>
            <p>
              Trong các hệ thống E-commerce / LMS, trạng thái bộ lọc (Search Query, Category, Sort) nếu chỉ lưu trong bộ nhớ React State (useState) sẽ bị biến mất hoàn toàn khi người dùng F5 tải lại trang hoặc khi gửi link cho đồng nghiệp.
            </p>
            <p>
              Đồng bộ State với URL Query String biến URL thành <strong>Single Source of Truth</strong> cho trạng thái tìm kiếm.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              2. Xử lý Bẫy Dữ liệu (URL Parameter Sanitization)
            </h4>
            <p>
              <strong>Bẫy thường gặp:</strong> Khi người dùng gõ vào ô tìm kiếm rồi xóa hết, nếu dùng <code>setSearchParams(&#123; q: '' &#125;)</code> thì URL sẽ biến thành <code>?q=</code> hoặc <code>?q=undefined</code>. Điều này gây xấu URL và làm các router/analytics phía server bị lỗi.
            </p>
            <p>
              <strong>Cách giải quyết triệt để:</strong>
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
{`const updateParams = (updates: Record<string, string>) => {
  const nextParams = new URLSearchParams(searchParams);
  Object.entries(updates).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      nextParams.delete(key); // Xóa hoàn toàn key khỏi URL
    } else {
      nextParams.set(key, value.trim());
    }
  });
  setSearchParams(nextParams, { replace: true });
};`}
            </pre>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition shadow"
          >
            Đã hiểu giải pháp
          </button>
        </div>
      </div>
    </div>
  );
};
