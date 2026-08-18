import React, { useState } from 'react';
import Clock from './Clock';
import './App.css';

function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Admin Dashboard</h1>
        <p className="header-subtitle">Module Đồng Hồ Thời Gian Thực (Lifecycle)</p>
      </header>
      <main className="main-content">
        <div className="dashboard-widget">
          <div className="widget-controls">
            <button
              className={`toggle-btn ${showClock ? 'active' : 'inactive'}`}
              onClick={() => setShowClock(!showClock)}
            >
              {showClock ? 'Tắt đồng hồ (Unmount)' : 'Bật đồng hồ (Mount)'}
            </button>
          </div>
          {showClock ? <Clock /> : (
            <div className="widget-placeholder">
              <p>Đồng hồ đã bị gỡ để giải phóng bộ nhớ.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
