import React, { useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Trải Nghiệm Khách Hàng</h1>
        <p className="header-subtitle">Module Trình Banner Chào Mừng (Conditional Rendering)</p>
      </header>
      <main className="main-content">
        <WelcomeBanner
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </main>
    </div>
  );
}

export default App;
