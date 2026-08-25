import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';
import type { FC } from 'react';
import './App.css';

// 1. Login Component
const Login: FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // Retrieve redirect path from location state or default to /dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If already logged in, redirect away
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim(), role);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="auth-card">
      <h2>🔐 Đăng nhập hệ thống</h2>
      <p className="card-subtitle">Vui lòng nhập tên tài khoản và chọn vai trò</p>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="form-label">
          Tên tài khoản:
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ví dụ: Hoàng Anh, Admin01..."
            className="form-input"
          />
        </label>
        
        <label className="form-label">
          Vai trò phân quyền:
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
            className="form-select"
          >
            <option value="user">Học viên thường (User)</option>
            <option value="admin">Quản trị viên (Admin)</option>
          </select>
        </label>
        
        <button type="submit" className="auth-btn">Đăng nhập</button>
      </form>

      <div className="login-tip">
        <p><strong>Mẹo thử nghiệm:</strong></p>
        <ul>
          <li>Đăng nhập vai trò <strong>User</strong> để chỉ xem được trang cá nhân.</li>
          <li>Đăng nhập vai trò <strong>Admin</strong> để xem được tất cả các trang quản trị.</li>
        </ul>
      </div>
    </div>
  );
};

// 2. Unauthorized Component
const Unauthorized: FC = () => {
  return (
    <div className="auth-card alert-card">
      <span className="alert-badge">⛔ 403 Forbidden</span>
      <h2>Không có quyền truy cập</h2>
      <p>Tài khoản của bạn không được phân quyền để truy xuất tài nguyên tại địa chỉ này.</p>
      <div className="alert-actions">
        <Link to="/dashboard" className="nav-btn-action">Quay lại Trang chính</Link>
      </div>
    </div>
  );
};

// 3. App Shell Layout (Main Navbar)
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-group">
            <span className="logo-icon">🛡️</span>
            <span className="logo-text">Rikkei Auth</span>
          </div>
          {user && (
            <nav className="header-nav">
              <Link to="/dashboard" className="nav-link">Cá nhân</Link>
              <Link to="/admin" className="nav-link">Quản trị</Link>
            </nav>
          )}
          <div className="user-profile-controls">
            {user ? (
              <div className="user-info">
                <span>Chào, <strong>{user.username}</strong> ({user.role.toUpperCase()})</span>
                <button onClick={logout} className="logout-btn">Đăng xuất</button>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="login-btn-nav">Đăng nhập</button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Rikkei Auth. Phân quyền và bảo mật đường dẫn React Router.</p>
      </footer>
    </div>
  );
};

// 4. User Dashboard Component
const Dashboard: FC = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-content">
      <h2>👋 Chào mừng bạn, {user?.username}!</h2>
      <p className="welcome-text">Đây là Trang Cá Nhân của học viên. Tất cả người dùng đã đăng nhập đều có thể xem trang này.</p>
      <hr className="divider" />
      <div className="features-grid">
        <div className="feature-card">
          <h4>📚 Khóa học của tôi</h4>
          <p>Xem danh sách các khóa học đã đăng ký học tập trực tuyến.</p>
        </div>
        <div className="feature-card">
          <h4>🏆 Học bạ & Chứng chỉ</h4>
          <p>Theo dõi tiến trình học tập và kiểm tra kết quả xếp hạng học phần.</p>
        </div>
      </div>
    </div>
  );
};

// 5. Admin Panel Component
const AdminPanel: FC = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-content admin-dashboard">
      <h2>⚙️ Hệ Thống Quản Trị Viên</h2>
      <p className="welcome-text">Cấp quyền hạn: {user?.username} ({user?.role.toUpperCase()}). Đây là trang độc quyền chỉ Admin mới truy cập được!</p>
      <hr className="divider" />
      <div className="admin-status-grid">
        <div className="stat-card">
          <span className="stat-value">1,248</span>
          <span className="stat-label">Học viên trực tuyến</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">4.92⭐</span>
          <span className="stat-label">Đánh giá trung bình</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">98.5%</span>
          <span className="stat-label">Tỷ lệ hoàn thành khóa học</span>
        </div>
      </div>
      <div className="admin-console">
        <h4>🖥️ Nhật ký hệ thống (System Logs)</h4>
        <pre className="logs-view">
          [16:40:02] Session initialized for admin: {user?.username}
          [16:40:11] DB Connection Status: Active
          [16:41:00] Auto-backup completed successfully.
        </pre>
      </div>
    </div>
  );
};

// Routing Wrapper
import { ReactNode } from 'react';

const InnerRouter: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected route (User and Admin) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected route (Admin Only) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* Redirect empty paths */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

export const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InnerRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
