import React from 'react';
import FAQList from './FAQList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Trợ Giúp Khách Hàng</h1>
        <p className="header-subtitle">Module Bộ Hỏi Đáp FAQ (Lifting State Up)</p>
      </header>
      <main className="main-content">
        <FAQList />
      </main>
    </div>
  );
}

export default App;
