import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

/**
 * Component Wrapper bảo vệ Route (Protected Boundary):
 * 1. Kiểm tra trạng thái đăng nhập qua `useAuth()`.
 * 2. Nếu chưa đăng nhập: Navigate sang `/login` kèm `state: { from: location }` và `replace: true`.
 * 3. Nếu role không đủ thẩm quyền: Navigate sang `/unauthorized` kèm `replace: true`.
 * 4. Nếu hợp lệ: Render component con hoặc `<Outlet />`.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Lưu lại vị trí URL mà người dùng định truy cập vào state để sau khi login điều hướng ngược lại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền vai trò (Role-based authorization)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
