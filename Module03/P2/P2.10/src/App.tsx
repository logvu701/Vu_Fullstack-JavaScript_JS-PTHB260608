import { useState, useMemo, useCallback } from 'react';
import StudentItem from './components/StudentItem';
import type { Student } from './components/StudentItem';
import type { FC } from 'react';
import './App.css';

export const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // List of mock students
  const [students] = useState<Student[]>([
    { id: 1, name: 'Nguyễn Hoàng Long', email: 'long.nh@rikkeisoft.com', major: 'Lập trình ReactJS', avatar: '👨‍💻' },
    { id: 2, name: 'Trần Thị Thu thảo', email: 'thao.ttt@rikkeisoft.com', major: 'Kiểm thử Phần mềm', avatar: '👩‍💻' },
    { id: 3, name: 'Phạm Minh Đức', email: 'duc.pm@rikkeisoft.com', major: 'Fullstack Node.js', avatar: '👨‍🎨' },
    { id: 4, name: 'Lê Thanh Hải', email: 'hai.lt@rikkeisoft.com', major: 'Khoa học dữ liệu (Python)', avatar: '📊' },
    { id: 5, name: 'Vũ Ngọc Lan', email: 'lan.vn@rikkeisoft.com', major: 'Thiết kế Đồ họa Figma', avatar: '🎨' },
    { id: 6, name: 'Đỗ Quốc Việt', email: 'viet.dq@rikkeisoft.com', major: 'Kỹ sư Cầu nối (Bridge SE)', avatar: '🇯🇵' },
  ]);

  // Handle Search Input optimization: memoized filtered students list
  const filteredStudents = useMemo(() => {
    console.log('[PERF] Re-computing filteredStudents useMemo...');
    if (!searchQuery.trim()) {
      return students;
    }
    const query = searchQuery.toLowerCase().trim();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [searchQuery, students]);

  // Handle Student Card selection: memoized callback to prevent child re-renders on parent state change
  const handleToggleSelect = useCallback((id: number) => {
    setSelectedIds((prevSelected) => {
      const nextSelected = new Set(prevSelected);
      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }
      return nextSelected;
    });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`perf-app theme-${theme}`}>
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">⚡</span>
          <h1 className="title">Rikkei Performance</h1>
          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'light' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng'}
            </button>
            <span className="tech-badge">useMemo & useCallback</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="info-banner">
          <h3>🚀 Kiểm nghiệm Trực quan Hiệu năng</h3>
          <p>
            Nhấp <strong>Chọn Học Viên</strong> để thay đổi trạng thái của thẻ đó.
            Quan sát huy hiệu <strong>Renders</strong> trên mỗi thẻ:
          </p>
          <ul className="info-list">
            <li><strong>Khi thay đổi Chế độ Sáng/Tối:</strong> Giao diện App render lại, nhưng tất cả các thẻ học viên <strong>không bị re-render</strong> (số lượng renders vẫn giữ nguyên) nhờ sự kết hợp giữa <code>React.memo</code> và <code>useCallback</code>!</li>
            <li><strong>Khi kích hoạt chọn một học viên:</strong> Chỉ thẻ được bấm thay đổi số lượng renders (+1), mọi thẻ khác không thay đổi!</li>
            <li><strong>Khi nhập ô tìm kiếm:</strong> <code>useMemo</code> giúp tính toán lại bộ lọc danh sách học viên tối ưu nhất.</li>
          </ul>
        </div>

        <div className="search-filter-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm nhanh tên, email hoặc chuyên ngành..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />
          <div className="selection-stats">
            Đã chọn: <strong>{selectedIds.size} / {students.length}</strong> học viên
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <span>🔍</span>
            <p>Không tìm thấy học viên tương thích với từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                isSelected={selectedIds.has(student.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Rikkei Performance. Trải nghiệm giao diện mượt mà và tối ưu hóa tài nguyên phần cứng.</p>
      </footer>
    </div>
  );
};

export default App;
