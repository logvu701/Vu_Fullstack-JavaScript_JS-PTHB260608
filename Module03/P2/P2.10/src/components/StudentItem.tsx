import { memo, useRef } from 'react';
import type { FC } from 'react';

export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  avatar: string;
}

interface StudentItemProps {
  student: Student;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

export const StudentItem: FC<StudentItemProps> = memo(({ student, isSelected, onToggleSelect }) => {
  // Track how many times this specific component has rendered
  const renderCount = useRef<number>(0);
  renderCount.current += 1;

  console.log(`[PERF] Rendering StudentItem: ${student.name} | Count: ${renderCount.current}`);

  return (
    <div className={`student-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-render-badge" title="Số lần component này re-render">
        Renders: {renderCount.current}
      </div>
      
      <div className="student-card-header">
        <span className="student-avatar">{student.avatar}</span>
        <div className="student-meta">
          <h4 className="student-name">{student.name}</h4>
          <span className="student-email">{student.email}</span>
        </div>
      </div>
      
      <div className="student-card-body">
        <div className="student-spec">
          <span className="spec-label">Chuyên ngành:</span>
          <span className="spec-value">{student.major}</span>
        </div>
      </div>

      <div className="student-card-footer">
        <button 
          onClick={() => onToggleSelect(student.id)}
          className={`select-student-btn ${isSelected ? 'selected-btn' : ''}`}
        >
          {isSelected ? 'Đã Chọn ✓' : 'Chọn Học Viên'}
        </button>
      </div>
    </div>
  );
});

// Set display name for easier debugging in React DevTools
StudentItem.displayName = 'StudentItem';

export default StudentItem;
