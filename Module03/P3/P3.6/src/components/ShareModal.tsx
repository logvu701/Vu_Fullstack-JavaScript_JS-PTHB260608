import React, { useState } from 'react';
import { Share2, Copy, Check, X, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/10 text-teal-600 rounded-2xl">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Chia sẻ Kết quả Bộ lọc</h3>
            <p className="text-xs text-slate-500">Liên kết chứa đầy đủ các tham số truy vấn tìm kiếm</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600">Đường dẫn hiện tại (Shareable URL):</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 select-all"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã copy!' : 'Sao chép'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Người nhận khi mở đường dẫn này sẽ tự động thấy chính xác kết quả và các từ khóa bạn đang tìm kiếm.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
