import React from 'react';
import BookStore from './BookStore';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Nhà Sách Trực Tuyến</h1>
        <p className="header-subtitle">Module Quản Lý Dữ Liệu Danh Sách Sách</p>
      </header>
      <main className="main-content">
        <BookStore />
      </main>
    </div>
  );
}

export default App;
