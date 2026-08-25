import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import type { FC } from 'react';

// Shell component to provide Router context
const Dashboard: FC = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-group">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Rikkei Search</span>
          </div>
          <div className="header-meta">
            <span className="api-badge">URL STATE SYNC</span>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <div className="welcome-banner">
          <h2>Bộ lọc Đồng bộ hóa URL</h2>
          <p>
            Tìm kiếm các khóa học trực tiếp. Liên kết kết quả tìm kiếm được mã hóa trên thanh địa chỉ URL. 
            Bạn có thể sao chép URL này và gửi cho người khác để chia sẻ chính xác kết quả tìm kiếm của mình!
          </p>
        </div>

        <SearchBar />
        <CourseList />
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} Rikkei Search. Đồng bộ URL tham số useSearchParams.</p>
        </div>
      </footer>
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
