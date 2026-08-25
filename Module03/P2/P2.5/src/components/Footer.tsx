import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Footer: FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Rikkei Learn. Giao diện đang chạy ở chế độ:{' '}
          <span className={`footer-badge ${theme}`}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">Điều khoản</a>
          <a href="#" className="footer-link">Bảo mật</a>
          <a href="#" className="footer-link">Hỗ trợ</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
