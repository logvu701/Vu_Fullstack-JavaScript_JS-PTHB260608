import { useCountdown } from './hooks/useCountdown';
import type { FC } from 'react';
import './App.css';

export const App: FC = () => {
  // 1. Quiz Countdown (60 seconds)
  const quizTimer = useCountdown(60, {
    onComplete: () => {
      alert('Hết giờ làm bài kiểm tra!');
    }
  });

  // 2. Flash Sale Countdown (15 seconds)
  const flashSaleTimer = useCountdown(15);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">⏳</span>
          <h1 className="header-title">Rikkei Timer</h1>
          <span className="tech-badge">CUSTOM HOOKS (useCountdown)</span>
        </div>
      </header>

      <main className="main-layout">
        {/* Phân hệ 1: Bài kiểm tra trắc nghiệm */}
        <section className="timer-section quiz-section">
          <div className="section-header">
            <h3>📝 Bài Kiểm Tra Trắc Nghiệm</h3>
            <span className={`status-tag ${quizTimer.isActive ? 'running' : 'paused'}`}>
              {quizTimer.isActive ? 'Đang tính giờ' : 'Đang tạm dừng'}
            </span>
          </div>
          <div className="timer-display">
            <span className="digit-segment">
              {Math.floor(quizTimer.time / 60).toString().padStart(2, '0')}
            </span>
            <span className="digit-separator">:</span>
            <span className="digit-segment">
              {(quizTimer.time % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="timer-controls">
            {!quizTimer.isActive ? (
              <button 
                onClick={quizTimer.start} 
                disabled={quizTimer.time === 0} 
                className="btn btn-start"
              >
                Bắt đầu
              </button>
            ) : (
              <button onClick={quizTimer.pause} className="btn btn-pause">
                Tạm dừng
              </button>
            )}
            <button onClick={quizTimer.reset} className="btn btn-reset">
              Đặt lại
            </button>
          </div>
          <p className="timer-instruction">
            Thời gian tự động ngắt kết nối khi chạm mốc 00:00 và hiển thị thông báo.
          </p>
        </section>

        {/* Phân hệ 2: Sự kiện Flash Sale */}
        <section className={`timer-section sale-section ${flashSaleTimer.time === 0 ? 'expired' : ''}`}>
          <div className="section-header">
            <h3>🔥 Flash Sale Sự Kiện Nổi Bật</h3>
            {flashSaleTimer.time > 0 ? (
              <span className="sale-live-tag">LIVE</span>
            ) : (
              <span className="sale-expired-tag">ENDED</span>
            )}
          </div>
          
          {flashSaleTimer.time > 0 ? (
            <>
              <div className="timer-display">
                <span className="digit-segment sale-digit">
                  {flashSaleTimer.time.toString().padStart(2, '0')}
                </span>
                <span className="digit-unit">giây còn lại</span>
              </div>
              <div className="timer-controls">
                {!flashSaleTimer.isActive ? (
                  <button onClick={flashSaleTimer.start} className="btn btn-start sale-btn">
                    Mở Sale
                  </button>
                ) : (
                  <button onClick={flashSaleTimer.pause} className="btn btn-pause sale-btn">
                    Tạm dừng
                  </button>
                )}
                <button onClick={flashSaleTimer.reset} className="btn btn-reset sale-btn">
                  Đặt lại
                </button>
              </div>
            </>
          ) : (
            <div className="sale-ended-message">
              <h4>💥 Flash Sale đã kết thúc!</h4>
              <p>Hẹn gặp lại quý khách vào chương trình săn sale tiếp theo.</p>
              <button onClick={flashSaleTimer.reset} className="btn btn-reset sale-revive-btn">
                Tái tạo đếm ngược (Reset)
              </button>
            </div>
          )}
          <p className="timer-instruction">
            Không gian đếm ngược tự dọn dẹp bộ nhớ (cleanup interval) khi component bị unmount hoặc reset.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Rikkei Timer. Thiết kế bộ đếm thời gian an toàn kiểu dữ liệu dạng Object.</p>
      </footer>
    </div>
  );
};

export default App;
