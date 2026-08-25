import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="logo-section">
          <span className="logo-icon">🎓</span>
          <h1 className="app-title">Rikkei Learn</h1>
        </div>
        <nav className="header-nav">
          <button 
            type="button" 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <span className="theme-toggle-content">
                <span className="toggle-icon">🌙</span>
                <span className="toggle-label">Giao diện tối</span>
              </span>
            ) : (
              <span className="theme-toggle-content">
                <span className="toggle-icon">☀️</span>
                <span className="toggle-label">Giao diện sáng</span>
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
export default Header;
