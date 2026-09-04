# P3.9: [Bài 9 - Xuất sắc] Kiến trúc Zustand Slices & Vanilla JS (Ngoài React)

Dự án triển khai mô hình **Zustand Slices Pattern** phân tách các mảng trạng thái độc lập (`authSlice`, `uiSlice`), đồng thời tích hợp **Axios Request & Response Interceptors** hoạt động trong môi trường Vanilla JS (ngoài React) bằng phương thức `useBoundStore.getState()`.

---

## 🎯 Mục tiêu Kỹ thuật

1. **Zustand Slices Pattern**:
   - Tách biệt `authSlice.ts` (`token`, `user`, `isAuthenticated`, `login`, `logout`) và `uiSlice.ts` (`theme`, `toasts`, `toggleTheme`, `addToast`, `removeToast`).
   - Hợp nhất thành một Store duy nhất `useBoundStore` với type-safety 100%.

2. **Truy cập State ngoài React (Vanilla JS)**:
   - Sử dụng `useBoundStore.getState().token` trong `axiosClient.interceptors.request` để tự động đính kèm `Authorization: Bearer <token>` cho mọi request HTTP.
   - Bắt lỗi HTTP 401/403 trong `interceptors.response` và gọi `useBoundStore.getState().addToast(...)` để hiển thị cảnh báo trực tiếp lên giao diện.

3. **Bẫy dữ liệu (Data Trap)**:
   - Khi người dùng đăng xuất (`token = null`), Request Interceptor an toàn loại bỏ header `Authorization`, tuyệt đối không gửi chuỗi rác `Bearer null` hoặc `Bearer undefined` gây lỗi từ chối tại API gateway.

4. **Trực quan hóa Request / Response Inspector**:
   - Trực tiếp kiểm tra Request Headers gửi đi và Payload nhận về từ các Endpoint bảo mật (`/api/admin/metrics`, `/api/manager/reports`) và công khai (`/api/public/news`).

---

## 🏗️ Cấu trúc Thư mục

```text
P3.9/
├── src/
│   ├── api/
│   │   └── axiosClient.ts             # Cấu hình Axios Instance & Interceptors sử dụng Zustand getState()
│   ├── components/
│   │   ├── ApiRequesterInspector.tsx  # Bộ gửi Request và phân tích Headers / Payload
│   │   ├── AuthPanel.tsx              # Quản lý Đăng nhập/Đăng xuất & Trực quan hóa JWT Token
│   │   ├── Header.tsx                 # Thanh điều hướng, Avatar User & Switcher Theme
│   │   ├── SlicesDocModal.tsx         # Modal tài liệu phân tích kỹ thuật Slices Pattern
│   │   └── ToastContainer.tsx         # Hàng đợi thông báo Toasts kích hoạt từ Zustand
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts           # Slice quản lý xác thực người dùng
│   │   │   └── uiSlice.ts             # Slice quản lý theme và toast notifications
│   │   └── useBoundStore.ts           # Bound Store kết hợp đa slice
│   ├── types/
│   │   └── store.ts                   # Định nghĩa Interface & Types
│   ├── App.tsx                        # Layout gốc và điều phối UI
│   ├── index.css                      # Tailwind CSS styles
│   └── main.tsx                       # Entry point
├── package.json
└── vite.config.ts
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy ứng dụng

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi động môi trường phát triển (Vite Dev Server)
npm run dev

# 3. Build kiểm tra TypeScript & Bundle production
npm run build
```
