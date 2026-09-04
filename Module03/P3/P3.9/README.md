# Dự án P3.9: [Bài 9 - Xuất sắc] Kiến trúc Luồng Truy cập Bảo mật (Protected Routes)

## 1. Mục tiêu Dự án
- Thiết lập cơ chế định tuyến mệnh lệnh (Imperative Routing) và bảo vệ dữ liệu độc quyền của phân hệ "Phòng học ảo" (Virtual Classroom) & Admin Portal.
- Tự động chặn các truy cập trái phép bằng URL trực tiếp và chuyển hướng người dùng sang trang `/login` kèm lưu vết URL ban đầu qua `state: { from: location }`.
- Sau khi đăng nhập thành công, sử dụng `useNavigate(from, { replace: true })` để đưa người dùng trở lại đúng trang mục tiêu.
- **Xử lý bẫy dữ liệu**: Ngăn chặn hiện tượng lặp vòng History Stack khi nhấn nút "Back" trên trình duyệt bằng cách áp dụng thuộc tính `replace: true`.

## 2. Cấu trúc Thư mục
```
P3.9/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                   # Thanh điều hướng, trạng thái login, đổi vai trò
│   │   ├── ProtectedRoute.tsx           # Wrapper component bảo vệ route
│   │   ├── ArchitectureTreeModal.tsx    # Sơ đồ bản vẽ cây định tuyến Public vs Protected
│   │   └── HistoryStackVisualizer.tsx   # Phân tích kỹ thuật giải quyết bẫy Browser History Stack
│   ├── context/
│   │   └── AuthContext.tsx              # Quản lý phiên xác thực, vai trò user (student, instructor, admin)
│   ├── pages/
│   │   ├── HomePage.tsx                 # Trang chủ công khai
│   │   ├── LoginPage.tsx                # Trang đăng nhập kèm xử lý { replace: true }
│   │   ├── VirtualClassroomPage.tsx     # Phòng học ảo độc quyền (Protected)
│   │   ├── DashboardPage.tsx            # Bảng điều khiển học viên (Protected)
│   │   ├── AdminPage.tsx                # Quản trị hệ thống (Role-based: admin only)
│   │   ├── UnauthorizedPage.tsx         # 403 Forbidden
│   │   └── NotFoundPage.tsx             # 404 Not Found
│   ├── types/
│   │   └── auth.ts                      # TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.9

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```
