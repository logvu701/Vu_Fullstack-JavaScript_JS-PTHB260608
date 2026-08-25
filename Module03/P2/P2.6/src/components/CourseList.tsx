import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import type { FC } from 'react';

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  price: string;
  badge: string;
  color: string;
}

export const CourseList: FC = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'Học ReactJS từ cơ bản đến nâng cao',
      category: 'Frontend',
      instructor: 'Trần Văn A',
      rating: 4.8,
      price: '1.200.000đ',
      badge: 'React',
      color: '#00d8ff'
    },
    {
      id: 2,
      title: 'Lập trình Node.js & Express REST API',
      category: 'Backend',
      instructor: 'Nguyễn Văn B',
      rating: 4.7,
      price: '1.500.000đ',
      badge: 'Node.js',
      color: '#83cd29'
    },
    {
      id: 3,
      title: 'Python cho Khoa học dữ liệu (Data Science)',
      category: 'Data Science',
      instructor: 'Lê Thị C',
      rating: 4.9,
      price: '1.800.000đ',
      badge: 'Python',
      color: '#ffd43b'
    },
    {
      id: 4,
      title: 'UI/UX Design - Tối ưu hóa trải nghiệm người dùng',
      category: 'Design',
      instructor: 'Phạm Văn D',
      rating: 4.6,
      price: '990.000đ',
      badge: 'Figma',
      color: '#f24e1e'
    },
    {
      id: 5,
      title: 'Lập trình viên chuyên nghiệp Fullstack JavaScript',
      category: 'Fullstack',
      instructor: 'Rikkei Academy',
      rating: 4.95,
      price: '3.500.000đ',
      badge: 'TypeScript',
      color: '#3178c6'
    },
    {
      id: 6,
      title: 'Cơ bản về Docker & Kubernetes cho DevOps',
      category: 'DevOps',
      instructor: 'Hoàng Văn E',
      rating: 4.75,
      price: '2.100.000đ',
      badge: 'DevOps',
      color: '#2496ed'
    }
  ]);

  // Filter courses based on query search parameters
  const filteredCourses = useMemo(() => {
    if (!query) return courses;
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.badge.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
    );
  }, [query, courses]);

  return (
    <div className="course-list-section">
      <div className="section-meta">
        <h3 className="section-title">Danh sách khóa học</h3>
        <span className="results-count">
          Tìm thấy <strong>{filteredCourses.length}</strong> khóa học
        </span>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-results-card">
          <span className="empty-icon">🔍</span>
          <h4>Không tìm thấy kết quả phù hợp</h4>
          <p>Hãy thử tìm kiếm với từ khóa khác (ví dụ: React, Node, Python...)</p>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="card-top" style={{ borderLeft: `6px solid ${course.color}` }}>
                <span className="card-badge" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                  {course.badge}
                </span>
                <span className="course-category">{course.category}</span>
              </div>
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <p className="instructor-name">Giảng viên: {course.instructor}</p>
                <div className="card-footer-details">
                  <div className="rating-badge">⭐ {course.rating.toFixed(2)}</div>
                  <div className="course-price">{course.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
