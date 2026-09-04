import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoursesPage } from './pages/CoursesPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
