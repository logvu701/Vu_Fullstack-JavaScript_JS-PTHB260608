import React from 'react';
import { Heart, Globe, Shield, Terminal, Mail, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  // Footer đăng ký trực tiếp useTheme()
  const { theme } = useTheme();

  return (
    <footer className={`border-t transition-colors ${
      theme === 'dark'
        ? 'bg-slate-900 border-slate-800 text-slate-400'
        : 'bg-white border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">
                R
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Rikkei Academy</span>
            </div>
            <p className="text-xs leading-relaxed">
              Hệ thống đào tạo Lập trình viên Fullstack Chuyên nghiệp chuẩn quốc tế.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Theme synced: {theme} mode</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Chương trình Học
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-emerald-500 transition">Frontend React & TS</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition">NodeJS & Microservices</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition">Fullstack Next.js</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Kiến trúc React
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-emerald-500 transition">Context API Pattern</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition">Custom Hooks</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition">State Management</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Liên kết Hỗ trợ
            </h5>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>academy@rikkeisoft.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>rikkeiacademy.edu.vn</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 Rikkei Academy. Hoàn thành Bài 5: Quản lý Trạng thái Toàn cục với Context API.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              TypeScript Strict Mode
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Defensive Context Hook
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
