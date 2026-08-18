import React from 'react';

function WelcomeBanner({ isLoggedIn, onLogin, onLogout }) {
  return (
    <div className="banner-wrapper">
      {isLoggedIn ? (
        <div className="banner welcome-banner">
          <div className="banner-icon-bg welcome">
            <svg className="banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="banner-content">
            <h2 className="banner-title">Chào mừng trở lại, Admin!</h2>
            <p className="banner-description">Hệ thống đã sẵn sàng. Bạn có thể quản lý các tài nguyên ngay bây giờ.</p>
          </div>
          <button className="banner-btn logout-btn" onClick={onLogout}>
            Đăng Xuất
          </button>
        </div>
      ) : (
        <div className="banner guest-banner">
          <div className="banner-icon-bg guest">
            <svg className="banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <div className="banner-content">
            <h2 className="banner-title">Chào mừng quý khách!</h2>
            <p className="banner-description">Vui lòng đăng nhập để bắt đầu sử dụng các tính năng nâng cao của hệ thống.</p>
          </div>
          <button className="banner-btn login-btn" onClick={onLogin}>
            Đăng Nhập Ngay
          </button>
        </div>
      )}
    </div>
  );
}

export default WelcomeBanner;
