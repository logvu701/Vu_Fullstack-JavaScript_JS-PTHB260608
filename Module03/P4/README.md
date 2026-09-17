# Module 03 - Phần 4: Axios, Mock Server & Kiến Trúc Resilient API Client

Bộ 6 dự án thực hành chuyên sâu chuẩn **React 18 + TypeScript + Vite + Tailwind CSS + Axios**, giải quyết triệt để các bài toán kiến trúc RESTful API, Mock Server, PUT vs PATCH Idempotency, Request Interceptor, Global Error Handling, Request Cancellation chống Race Condition và Mini Module Resilient API Client chuẩn Enterprise Production.

---

## 📑 Danh mục Dự án & Yêu cầu Nghiệp vụ

### 1. [P4.5 - [Bài 5 - Khá] Tích hợp Mock Server và Thao tác CRUD](./P4.5)
- **Mục tiêu**: Thiết lập máy chủ giả lập RESTful sử dụng `json-server` tại cổng **3004**, khởi tạo tệp `db.json` và thực hiện trọn vẹn vòng đời CRUD với Axios.
- **Nghiệp vụ**:
  - `GET /contacts`: Lấy danh sách danh bạ.
  - `POST /contacts`: Thêm mới một liên hệ (họ tên, SĐT, email, nhóm danh bạ).
  - `DELETE /contacts/:id`: Xóa một số điện thoại / liên hệ.
- **Bẫy dữ liệu (Data Trap)**: Gửi lệnh DELETE một ID không tồn tại trên hệ thống (ví dụ: `ID: 999999`). Bắt và xử lý mã lỗi `404 Not Found` từ mock server, cô lập lỗi và hiển thị thông báo trực quan trên UI thay vì để ứng dụng bị crash.
- **Đánh giá**:
  - Tệp `db.json` chứa cấu trúc danh bạ khởi tạo.
  - Script `npm run server` chạy `json-server db.json --port 3004`.
  - Giao diện Live Network Inspector ghi nhận chi tiết từng request.

---

### 2. [P4.6 - [Bài 6 - Khá] Phân tích Hành vi: PUT vs PATCH](./P4.6)
- **Mục tiêu**: Hiểu rõ bản chất tính Lũy đẳng (Idempotency), kích thước payload và sự khác biệt giữa hai phương thức cập nhật tài nguyên theo chuẩn RFC.
- **Bối cảnh**: Hồ sơ nhân sự có 10 trường dữ liệu. Nhân viên A chỉ muốn đổi "Số điện thoại", nhân viên B muốn ghi đè toàn bộ hồ sơ.
- **Yêu cầu**:
  - Hàm 1: Sử dụng `axios.put(url, fullPayload)`.
  - Hàm 2: Sử dụng `axios.patch(url, partialPayload)`.
- **Bẫy nghiệp vụ (Business Trap)**: Gửi thiếu trường trong phương thức PUT sẽ dẫn đến hậu quả mất mát dữ liệu (Data Loss) trên máy chủ RESTful tiêu chuẩn do cơ chế Full Replacement (RFC 7231). Trong khi PATCH (RFC 5789) chỉ thay đổi từng phần (Partial Modification).
- **Đánh giá**:
  - Báo cáo phân tích chuyên sâu I/O & Idempotency: [`REPORT_PUT_VS_PATCH.md`](./P4.6/REPORT_PUT_VS_PATCH.md).
  - UI tương tác trực quan cho phép kiểm chứng 2 kịch bản nhân viên và cảnh báo Data Loss.

---

### 3. [P4.7 - [Bài 7 - Giỏi] Tự Động Hóa Định Danh với Request Interceptor](./P4.7)
- **Mục tiêu**: Can thiệp vòng đời Request để tự động tiêm (inject) siêu dữ liệu xác thực `Authorization: Bearer <token>` dùng chung bằng `axios.interceptors.request`.
- **Bối cảnh**: Hệ thống CRM yêu cầu mọi API phải đính kèm Access Token. Loại bỏ hoàn toàn việc gõ header thủ công ở từng hàm gọi API.
- **Bẫy dữ liệu (Data Trap)**: Nếu người dùng chưa đăng nhập hoặc token không tồn tại (`null`/`undefined`), Interceptor phải bỏ qua việc gán header mà không làm sập ứng dụng (không gửi `Bearer null`), để máy chủ tự đánh lỗi `401 Unauthorized` theo chuẩn bảo mật.
- **Đánh giá**:
  - Đính kèm ảnh chụp Request Headers trong DevTools chứng minh token được tiêm thành công: [`request-headers-proof.svg`](./P4.7/request-headers-proof.svg).
  - Giao diện CRM Dashboard tích hợp bộ chuyển đổi phiên đăng nhập và Network Header Inspector.

---

### 4. [P4.8 - [Bài 8 - Giỏi] Phân Tích Đa Giải Pháp: Global Error Handling](./P4.8)
- **Mục tiêu**: Xây dựng trạm kiểm soát phản hồi toàn cục bằng `axios.interceptors.response` để chặn đứng lỗi 401 (hết hạn phiên) và chuyển hướng Login tức thì.
- **Yêu cầu so sánh**:
  - So sánh việc xử lý mã 401 ở tầng Interceptor tập trung (Global) so với việc bắt lỗi ở từng khối `catch` của hàng chục hàm gọi API riêng lẻ (Phân tán).
- **Đánh giá**:
  - Bảng so sánh Ưu - Nhược điểm đa giải pháp chi tiết: [`COMPARISON_GLOBAL_VS_LOCAL_ERROR.md`](./P4.8/COMPARISON_GLOBAL_VS_LOCAL_ERROR.md).
  - Triển khai mã nguồn Global Response Interceptor tự động dọn sạch token và chuyển hướng về màn hình Login.
  - UI Demo với Scenario Test Bench thử nghiệm các mã HTTP: 200, 401, 403, 500.

---

### 5. [P4.9 - [Bài 9 - Xuất sắc] Tối Ưu Hiệu Suất với Kỹ Thuật Hủy Request (Cancellation)](./P4.9)
- **Mục tiêu**: Quản lý tài nguyên mạng chủ động và giải quyết triệt để lỗi **Race Condition** trong tính năng Live Search bằng Web API `AbortController` và `axios.isCancel()`.
- **Nghiệp vụ**:
  - Khi người dùng gõ ký tự mới, chủ động gọi `controller.abort()` để hủy bỏ yêu cầu API đang bay trước đó, sau đó mới gửi yêu cầu mới kèm `signal: controller.signal`.
- **Bẫy dữ liệu (Data Trap)**: Quá trình hủy request sẽ ném ra ngoại lệ `CanceledError` vào khối `catch`. Bắt buộc phải sử dụng `axios.isCancel(err)` để phân biệt đây là hành vi chủ động hủy chứ không phải sự cố mạng, tránh in `console.error` rác và báo lỗi ảo cho người dùng.
- **Đánh giá**:
  - Sơ đồ tuần tự (Sequence Diagram) mô tả chi tiết luồng hủy request: [`SEQUENCE_DIAGRAM.md`](./P4.9/SEQUENCE_DIAGRAM.md).
  - UI Live Search có thanh trượt điều chỉnh độ trễ mạng (300ms - 2000ms), bảng Live Request Timeline ghi nhận trạng thái `ABORTED` vs `RESOLVED`.

---

### 6. [P4.10 - [Bài 10 - Xuất sắc] Mini Module: Bộ Giao Tiếp API Kháng Lỗi (Resilient API Client)](./P4.10)
- **Mục tiêu**: Đóng gói toàn bộ logic gọi API thành một module độc lập, an toàn và có khả năng chống chịu lỗi cao cho môi trường Production.
- **Yêu cầu kiến trúc**:
  - Axios Instance với `timeout: 5000ms`.
  - Request Interceptor gắn Bearer Token.
  - Response Interceptor: Chỉ trả về `response.data` nếu thành công (ẩn đi metadata Axios để code UI gọn gàng). Chặn bắt lỗi 401 và 500.
  - Cung cấp các hàm export chuẩn hóa: `get(url, params)`, `post(url, data)`, `put(url, data)`, `remove(url)`.
- **Bẫy dữ liệu (Data Trap)**: Tiền xử lý dọn dẹp các params rác (`undefined`, `null`, `""`, `NaN`) bằng hàm `cleanParams()` trước khi đẩy qua Axios.
- **Đánh giá**:
  - File cấu trúc module hoàn chỉnh tại `src/api/client/` tách biệt 100% với tầng UI.
  - Ma trận bao phủ 8 kịch bản ngoại lệ: [`EXCEPTION_SCENARIOS.md`](./P4.10/EXCEPTION_SCENARIOS.md).
  - UI Test Bench toàn diện cho phép gọi các hàm và kiểm thử tham số rác.

---

## 🚀 Hướng Dẫn Khởi Chạy

Mỗi thư mục từ `P4.5` đến `P4.10` là một dự án hoàn chỉnh và độc lập:

```bash
# 1. Chạy dự án P4.5 (Quản lý Danh bạ & Mock Server):
cd P4.5
npm install
npm run server  # Khởi động json-server cổng 3004
npm run dev     # Mở giao diện trên cổng 5174

# 2. Chạy dự án P4.6 (PUT vs PATCH):
cd P4.6
npm install
npm run dev     # Mở giao diện trên cổng 5175

# 3. Chạy dự án P4.7 (Request Interceptor):
cd P4.7
npm install
npm run dev     # Mở giao diện trên cổng 5176

# 4. Chạy dự án P4.8 (Global Error Handling):
cd P4.8
npm install
npm run dev     # Mở giao diện trên cổng 5177

# 5. Chạy dự án P4.9 (Request Cancellation):
cd P4.9
npm install
npm run dev     # Mở giao diện trên cổng 5178

# 6. Chạy dự án P4.10 (Resilient API Client):
cd P4.10
npm install
npm run dev     # Mở giao diện trên cổng 5179
```
