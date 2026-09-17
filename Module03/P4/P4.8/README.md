# P4.8 - [Bài 8 - Giỏi] Phân Tích Đa Giải Pháp: Global Error Handling

## 1. Mục tiêu & Bối cảnh
- **Mục tiêu**: Xây dựng trạm kiểm soát phản hồi toàn cục bằng `axios.interceptors.response` để chặn đứng các lỗi hệ thống (đặc biệt là lỗi hết hạn phiên `401 Unauthorized`, lỗi cấm quyền `403 Forbidden`, và lỗi sập máy chủ `500 Internal Server Error`) trước khi chúng lan đến các component giao diện.
- **Bối cảnh**: Khi phiên đăng nhập của người dùng hết hạn (Server trả về mã 401), ứng dụng cần ngay lập tức dọn dẹp bộ nhớ/token, hiển thị thông báo tập trung và chuyển hướng người dùng về trang Đăng nhập (Login), bất kể họ đang ở màn hình nào.
- **Yêu cầu phân tích**: So sánh việc xử lý mã 401 ở tầng Interceptor cục bộ (tập trung) so với việc bắt lỗi ở từng khối `catch` của hàng chục hàm gọi API riêng lẻ (phân tán).

---

## 2. Cấu trúc Dự án
```
P4.8/
├── COMPARISON_GLOBAL_VS_LOCAL_ERROR.md # Tài liệu phân tích đa giải pháp chi tiết
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── src/
    ├── api/
    │   └── authService.ts             # Axios client với Global Response Interceptor
    ├── components/
    │   ├── AdminDashboard.tsx         # Bảng điều khiển quản trị & Scenario Test Bench
    │   ├── ComparisonTableModal.tsx   # Modal hiển thị bảng ma trận so sánh đa giải pháp
    │   └── LoginView.tsx              # Màn hình đăng nhập chuyển hướng tự động
    ├── types/
    │   └── errorTypes.ts              # Type definitions (AuthSession, ErrorEventLog)
    ├── App.tsx                        # Quản lý luồng chuyển hướng toàn cục
    ├── index.css
    └── main.tsx
```

---

## 3. Tóm tắt So Sánh: Global Interceptor vs Local Try/Catch

| Tiêu chí | Response Interceptor (Tập trung) | Local catch ở từng API (Phân tán) |
| :--- | :--- | :--- |
| **Tính lặp lại mã (DRY)** | **Tối ưu 100%** (Viết 1 lần trong interceptor) | Phải viết lại khối `if (status === 401)` ở hàng trăm nơi |
| **Bảo trì & Thay đổi URL** | Sửa đúng 1 dòng mã trong Interceptor | Rà soát và sửa đổi thủ công trên mọi file |
| **Tính nhất quán UX** | Tuyệt đối đồng nhất trên toàn hệ thống | Dễ sót dẫn đến đơ spinner hoặc treo màn hình |
| **Hỗ trợ Silent Refresh Token** | Rất thuận lợi với retry queue | Không thể triển khai hiệu quả |

---

## 4. Hướng dẫn Khởi chạy
```bash
cd P4.8
npm install
npm run dev
```
Truy cập `http://localhost:5177`.
