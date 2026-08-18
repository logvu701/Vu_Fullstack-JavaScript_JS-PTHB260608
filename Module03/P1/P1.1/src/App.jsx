import React from 'react';
import UserProfile from './UserProfile';
import './App.css';

function App() {
  const employees = [
    { id: 1, name: 'Nguyễn Văn A', role: 'Lập trình viên React' },
    { id: 2, name: 'Trần Thị B', role: 'Quản lý dự án' },
    { id: 3, name: 'Phạm Văn C', role: 'Thiết kế UI/UX' }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Hệ Thống Quản Lý Nhân Sự</h1>
        <p className="header-subtitle">Module Hiển Thị Thông Tin Nhân Viên</p>
      </header>
      <main className="profiles-grid">
        {employees.map((employee) => (
          <UserProfile
            key={employee.id}
            name={employee.name}
            role={employee.role}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
