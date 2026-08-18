import React from 'react';
import CartCounter from './CartCounter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Bán Hàng Trực Tuyến</h1>
        <p className="header-subtitle">Module Giỏ Hàng & Cập Nhật Trạng Thái</p>
      </header>
      <main className="main-content">
        <CartCounter />
      </main>
    </div>
  );
}

export default App;
