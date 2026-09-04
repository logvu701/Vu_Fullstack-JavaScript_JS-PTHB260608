import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { DemoOutsideProvider } from './components/DemoOutsideProvider';
import { DocModal } from './components/DocModal';

/**
 * App component:
 * Bọc toàn bộ ứng dụng bằng ThemeProvider.
 * Các component con (Header, MainContent, Footer) tự động subscribe vào Context mà KHÔNG nhận prop nào!
 */
export function App() {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isTrapDemoOpen, setIsTrapDemoOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
        {/* Header - Nơi đặt nút toggle Theme */}
        <Header
          onOpenDocs={() => setIsDocsOpen(true)}
          onOpenTrapDemo={() => setIsTrapDemoOpen(true)}
        />

        {/* Main Content - Nơi áp dụng màu sắc và dữ liệu khóa học */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Footer - Áp dụng theme độc lập */}
        <Footer />

        {/* Modals hỗ trợ kiểm tra và tài liệu */}
        <DocModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
        <DemoOutsideProvider isOpen={isTrapDemoOpen} onClose={() => setIsTrapDemoOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
