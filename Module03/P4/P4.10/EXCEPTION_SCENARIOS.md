# MA TRẬN CÁC KỊCH BẢN NGOẠI LỆ ĐÃ BAO PHỦ (EXCEPTION SCENARIOS MATRIX)

**Module**: Resilient API Client (`src/api/client/`)  
**Dự án**: P4.10 - Bộ Giao Tiếp Mạng Kháng Lỗi Chuẩn Enterprise Production  
**Tác giả**: Lập trình viên Frontend / Tech Lead Candidate  

---

## 1. Kiến Trúc Phân Tầng Tách Biệt (Architectural Separation)

Module mạng được cô lập 100% trong thư mục `src/api/client/` độc lập hoàn toàn với tầng giao diện (UI Layer / Components):

```
┌─────────────────────────────────────────────────────────────┐
│                 TẦNG GIAO DIỆN (UI LAYER)                   │
│   Component UI chỉ gọi: get(), post(), put(), remove()      │
│   Nhận dữ liệu sạch thuần túy (data: T), không dính Axios   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             BỘ TIỀN XỬ LÝ (cleanParams.ts)                  │
│   Dọn dẹp triệt để: undefined, null, "", NaN, whitespace   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          AXIOS CLIENT & INTERCEPTORS PIPELINE               │
│   • Request Interceptor: Inject "Authorization: Bearer"     │
│   • Timeout Enforcer: 5000ms                                │
│   • Response Interceptor: Unwrap data & Chặn bắt lỗi        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               MÁY CHỦ GATEWAY (BACKEND API)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Danh Sách 8 Kịch Bản Ngoại Lệ Đã Bao Phủ

### Kịch bản 1: Tham số Params Rác (Dirty / Garbage Query Params) - [Bẫy Nghiệp Vụ Cốt Lõi]
- **Tình huống**: Lập trình viên truyền params chứa các giá trị rác:
  ```typescript
  get('/products', { keyword: 'laptop', page: undefined, filter: null, sort: '', invalid: NaN });
  ```
- **Hậu quả nếu không xử lý**: URL bị sinh ra dạng rác: `?keyword=laptop&page=undefined&filter=null&sort=&invalid=NaN`, khiến Backend quăng lỗi `400 Bad Request` hoặc `500 Unhandled Exception`.
- **Cơ chế kháng lỗi của Module**: Hàm `cleanParams()` tiền xử lý tự động lọc sạch toàn bộ các key có giá trị `undefined`, `null`, chuỗi rỗng và `NaN`. URL gửi đi thực tế là:
  ```
  ?keyword=laptop
  ```

---

### Kịch bản 2: Phiên Đăng Nhập Hết Hạn (HTTP 401 Unauthorized)
- **Tình huống**: Token hết hạn hoặc người dùng bị thu hồi quyền truy cập.
- **Cơ chế kháng lỗi của Module**:
  - Response Interceptor chặn bắt mã 401 trước khi lỗi chạm vào UI Component.
  - Kích hoạt callback `onUnauthorized()`.
  - Tự động dọn sạch token rác trong kho lưu trữ.
  - Chuẩn hóa lỗi về `ApiErrorResponse` có timestamp và thông báo tiếng Việt rõ ràng.

---

### Kịch bản 3: Truy Cập Trái Phép (HTTP 403 Forbidden)
- **Tình huống**: Người dùng cố gắng thực hiện hành động ngoài phạm vi phân quyền Role (ví dụ: nhân viên xóa dữ liệu admin).
- **Cơ chế kháng lỗi của Module**: Interceptor định tuyến mã 403 thành cảnh báo phân quyền tập trung, ngăn chặn thao tác và không làm treo trạng thái tải của giao diện.

---

### Kịch bản 4: Máy Chủ Sập Nguồn / Lỗi Nội Bộ (HTTP 500 Internal Server Error)
- **Tình huống**: Database Backend bị crash, lỗi cú pháp SQL hoặc null pointer ở server.
- **Cơ chế kháng lỗi của Module**:
  - Bắt mã 500 tại Response Interceptor.
  - Kích hoạt `onServerError()`.
  - Đóng gói thông báo thân thiện: *"HTTP 500 Internal Server Error: Máy chủ nội bộ gặp sự cố xử lý dữ liệu"*, che giấu stacktrace nhạy cảm của backend để đảm bảo an ninh mạng.

---

### Kịch bản 5: Quá Thời Gian Chờ (Request Timeout 5000ms)
- **Tình huống**: Mạng chập chờn hoặc máy chủ xử lý truy vấn quá 5 giây.
- **Cơ chế kháng lỗi của Module**:
  - Thuộc tính `timeout: 5000` của Axios Instance tự động ngắt kết nối khi chạm ngưỡng 5000ms (`ECONNABORTED`).
  - Phản hồi mã lỗi chuẩn 408 / Timeout Error, giải phóng tài nguyên RAM trình duyệt, không để người dùng chờ đợi vô tận.

---

### Kịch bản 6: Mất Kết Nối Mạng Hoàn Toàn (Network Offline / Gateway Down)
- **Tình huống**: Rớt cáp mạng, bật chế độ máy bay hoặc DNS không phân giải được host.
- **Cơ chế kháng lỗi của Module**: Bắt `error.code === 'ERR_NETWORK'` và đóng gói thành lỗi kết nối vật lý, thông báo người dùng kiểm tra lại đường truyền Internet.

---

### Kịch bản 7: Tài Nguyên Không Tồn Tại (HTTP 404 Not Found)
- **Tình huống**: ID truy vấn không có trong hệ thống hoặc gõ sai đường dẫn endpoint.
- **Cơ chế kháng lỗi của Module**: Bắt mã 404, trả về đối tượng lỗi chuẩn hóa có đầy đủ URL gây lỗi và mã trạng thái để UI hiển thị Empty State thích hợp.

---

### Kịch bản 8: Ô Nhiễm Metadata Axios (Axios Metadata Pollution)
- **Tình huống**: Axios mặc định trả về đối tượng cồng kềnh gồm `{ data, status, statusText, headers, config, request }`. Nếu lập trình viên UI phải liên tục chấm `.data.data` hoặc `.data.items`, mã nguồn giao diện sẽ bị phụ thuộc chặt chẽ vào cấu trúc nội bộ của Axios (Tight Coupling).
- **Cơ chế kháng lỗi của Module**: Response Interceptor tự động bóc tách (unwrap) và chỉ trả về đúng `response.data`, giúp tầng UI giữ nguyên tính trong sáng và ngắn gọn:
  ```typescript
  // UI Code gọn gàng 100%:
  const products = await get<Product[]>('/products');
  // Thay vì: const res = await axios.get(...); const products = res.data;
  ```
