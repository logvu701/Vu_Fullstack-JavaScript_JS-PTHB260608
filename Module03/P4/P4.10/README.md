# P4.10 - [Bài 10 - Xuất sắc] Mini Module: Bộ Giao Tiếp API Kháng Lỗi (Resilient API Client)

## 1. Mục tiêu & Bối cảnh
- **Mục tiêu**: Thiết kế một module mạng độc lập, an toàn, chuẩn Production có khả năng chống chịu lỗi cao để toàn bộ các thành viên trong đội dự án chỉ việc tái sử dụng mà không cần cấu hình lại Axios ở từng màn hình.
- **Yêu cầu kiến trúc cốt lõi**:
  - Tạo một Axios Instance với giới hạn `timeout: 5000ms`.
  - Tích hợp **Request Interceptor** để tự động gắn `Authorization: Bearer <token>` an toàn.
  - Tích hợp **Response Interceptor**:
    - Tự động bóc tách và chỉ trả về `response.data` nếu thành công (ẩn đi metadata Axios để code UI ngắn gọn).
    - Chặn bắt và chuẩn hóa các lỗi quan trọng: `401 Unauthorized` (hết hạn phiên) và `500 Internal Server Error` (sập máy chủ).
  - Cung cấp các hàm export chuẩn hóa:
    - `get(url, params)`
    - `post(url, data)`
    - `put(url, data)`
    - `remove(url)`
- **Bẫy dữ liệu (Data Trap)**: Khi lập trình viên truyền tham số params chứa các giá trị không hợp lệ (`undefined`, `null`, `""`, `NaN`), module phải chủ động tiền xử lý bằng `cleanParams()` để lọc sạch các params rác trước khi chuyển tiếp cho Axios, tránh sinh ra URL bẩn gây lỗi máy chủ.

---

## 2. Cấu Trúc Module Mạng Độc Lập
Tách biệt hoàn toàn với tầng UI tại thư mục `src/api/client/`:
```
src/api/client/
├── index.ts           # Re-exports: get, post, put, remove, cleanParams, apiClient
├── httpClient.ts      # Axios Instance khởi tạo với timeout 5000ms
├── interceptors.ts    # Request & Response Interceptors (Auth, Unwrap, Error Handling)
├── paramCleaner.ts    # Bộ tiền xử lý dọn dẹp params rác (undefined, null, NaN, "")
└── types.ts           # Type definitions (ApiErrorResponse, ClientExecutionLog...)
```

---

## 3. Danh Sách Các Kịch Bản Ngoại Lệ Đã Bao Phủ
Chi tiết xem tại [`EXCEPTION_SCENARIOS.md`](./EXCEPTION_SCENARIOS.md):
1. **Dirty / Garbage Params**: Tự động lọc sạch `undefined`, `null`, `""`, `NaN`.
2. **HTTP 401 Unauthorized**: Bắt lỗi tập trung, xóa token và kích hoạt `onUnauthorized`.
3. **HTTP 403 Forbidden**: Chặn lỗi cấm quyền, ngăn chặn hành vi phá hoại dữ liệu.
4. **HTTP 500 Internal Server Error**: Bọc thông báo thân thiện, che giấu stacktrace nhạy cảm.
5. **Request Timeout (5000ms)**: Tự động ngắt kết nối khi vượt quá 5 giây, bảo vệ RAM trình duyệt.
6. **Network Offline / Gateway Down**: Bắt lỗi `ERR_NETWORK` khi mất kết nối Internet.
7. **HTTP 404 Not Found**: Chuẩn hóa lỗi endpoint để UI hiển thị Empty State.
8. **Axios Metadata Isolation**: Trả về trực tiếp `response.data` sạch cho tầng UI.

---

## 4. Hướng dẫn Khởi chạy
```bash
cd P4.10
npm install
npm run dev
```
Truy cập `http://localhost:5179`.
