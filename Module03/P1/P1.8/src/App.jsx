import React, { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoal = () => {
    setScore((prev) => prev + 1);
  };

  const handleReset = () => {
    setScore(0);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Giám Sát Trận Đấu</h1>
        <p className="header-subtitle">Module Tối Ưu Hóa Hiệu Năng (shouldComponentUpdate)</p>
      </header>
      <main className="main-content">
        <div className="game-widget">
          <div className="debug-info">
            <p className="parent-pulse">
              Tiến trình cha: <span className="pulse-indicator"></span> Đang chạy thử ({ticker} giây)
            </p>
            <p className="debug-desc">
              Hệ thống mô phỏng truyền tín hiệu kiểm tra định kỳ mỗi giây (Props ảo liên tục). Hãy mở F12 Console để xem log chặn render dư thừa lúc điểm số không đổi.
            </p>
          </div>
          <ScoreBoard score={score} />
          <div className="game-controls">
            <button className="control-btn goal-btn" onClick={handleGoal}>
              GHI BÀN (+1 ĐIỂM)
            </button>
            <button className="control-btn reset-btn" onClick={handleReset}>
              Lập lại trận đấu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
