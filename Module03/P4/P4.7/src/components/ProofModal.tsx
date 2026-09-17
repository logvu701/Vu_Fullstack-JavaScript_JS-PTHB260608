import React from "react";
import { ShieldCheck, X, Download, ExternalLink } from "lucide-react";

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProofModal: React.FC<ProofModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-teal-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Bằng Chứng Tiêm Access Token (Request Headers Proof)
              </h3>
              <p className="text-xs text-teal-700 font-medium">
                Ảnh chụp trực quan bảng điều khiển Chrome DevTools Network Tab
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content with Image */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 leading-relaxed">
            <span className="font-bold">Tiêu chí đánh giá hoàn thành: </span>
            Đính kèm ảnh chụp Request Headers trong trình duyệt chứng minh Token đã được tiêm thành công với tiền tố <code className="font-mono bg-teal-100 px-1 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code>.
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 p-2">
            <img
              src="/request-headers-proof.svg"
              alt="Chrome DevTools Request Headers Proof"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Tệp nguồn: /request-headers-proof.svg
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
