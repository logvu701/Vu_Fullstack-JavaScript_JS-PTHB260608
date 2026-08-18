import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password === '') {
      setErrorMessage('Vui lòng kiểm tra lại thông tin');
      return;
    }

    if (username.includes(' ')) {
      setErrorMessage('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setErrorMessage('');
    console.log('Đăng nhập thành công với:', { username, password });
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h2 className="login-title">Đăng Nhập Hệ Thống</h2>
        <p className="login-subtitle">Nhập tài khoản quản trị viên của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập (không chứa khoảng trắng)"
            className={errorMessage ? 'input-error' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            className={errorMessage ? 'input-error' : ''}
          />
        </div>

        {errorMessage && (
          <div className="error-banner">
            <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span className="error-text">{errorMessage}</span>
          </div>
        )}

        <button type="submit" className="submit-btn">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
