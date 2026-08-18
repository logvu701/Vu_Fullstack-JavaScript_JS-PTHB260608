import React from 'react';
import LoginForm from './LoginForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Quản Trị Hệ Thống</h1>
        <p className="header-subtitle">Module Biểu Mẫu Nhập Liệu (Controlled Components)</p>
      </header>
      <main className="main-content">
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
