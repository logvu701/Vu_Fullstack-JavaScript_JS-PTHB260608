import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuizModule } from './components/QuizModule';
import { FlashSaleModule } from './components/FlashSaleModule';
import { ComparisonTable } from './components/ComparisonTable';
import { UnmountTestModule } from './components/UnmountTestModule';

export function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashSale' | 'comparison' | 'unmountTest'>('quiz');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {activeTab === 'quiz' && <QuizModule />}
        {activeTab === 'flashSale' && <FlashSaleModule />}
        {activeTab === 'comparison' && <ComparisonTable />}
        {activeTab === 'unmountTest' && <UnmountTestModule />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © 2026 Rikkei Academy. Hoàn thành Bài 7: Trừu tượng hóa Logic trạng thái (Custom Hooks).
      </footer>
    </div>
  );
}

export default App;
