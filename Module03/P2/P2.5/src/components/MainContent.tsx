import { useState } from 'react';
import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';

export const MainContent: FC<{ triggerFault: () => void }> = ({ triggerFault }) => {
  const { theme } = useTheme();
  
  const [courses] = useState([
    {
      id: 1,
      title: 'Fullstack JavaScript (React, Node.js)',
      description: 'Học lập trình từ cơ bản đến nâng cao cùng Rikkei Academy. Đạt chuẩn kỹ sư phần mềm.',
      duration: '6 tháng',
      level: 'Khá',
      rating: 4.8,
      banner: '💻'
    },
    {
      id: 2,
      title: 'React Native & Mobile App Development',
      description: 'Xây dựng ứng dụng di động đa nền tảng cho iOS & Android với React Native.',
      duration: '3 tháng',
      level: 'Giỏi',
      rating: 4.9,
      banner: '📱'
    },
    {
      id: 3,
      title: 'UI/UX Design Advanced',
      description: 'Thiết kế giao diện người dùng chuyên sâu và trải nghiệm tối ưu.',
      duration: '2 tháng',
      level: 'Khá',
      rating: 4.7,
      banner: '🎨'
    }
  ]);

  return (
    <main className="main-content">
      <div className="welcome-banner">
        <h2 className="banner-title">Chào mừng trở lại học viên, Dam Loc!</h2>
        <p className="banner-subtitle">
          Hôm nay là một ngày tuyệt vời để học kiến thức mới. Hệ thống đang sử dụng giao diện{' '}
          <strong className="theme-highlight">{theme === 'light' ? 'Sáng' : 'Tối'}</strong>.
        </p>
      </div>

      <div className="section-header">
        <h3 className="section-title">Khóa học của bạn</h3>
        <button 
          onClick={triggerFault} 
          className="faulty-trigger-btn"
          title="Thử nghiệm lỗi bằng cách load component nằm ngoài Provider"
        >
          💥 Đăng nhập / Test Context Data Trap
        </button>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="card-banner">{course.banner}</div>
            <div className="card-body">
              <span className="card-badge">{course.level}</span>
              <h4 className="card-title">{course.title}</h4>
              <p className="card-desc">{course.description}</p>
              <div className="card-meta">
                <span className="meta-item">⏱️ {course.duration}</span>
                <span className="meta-item">⭐ {course.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default MainContent;
