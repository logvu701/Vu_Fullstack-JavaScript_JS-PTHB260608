import React from 'react';
import PomodoroTimer from './PomodoroTimer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Máy Hẹn Giờ Tập Trung</h1>
        <p className="header-subtitle">Module Máy Đếm Ngược Pomodoro (Mini Product)</p>
      </header>
      <main className="main-content">
        <PomodoroTimer />
      </main>
    </div>
  );
}

export default App;
