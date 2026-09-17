# SƠ ĐỒ LUỒNG DỮ LIỆU (SEQUENCE DIAGRAM): KỸ THUẬT HỦY REQUEST & CHỐNG RACE CONDITION

**Dự án**: P4.9 - Tối Ưu Hiệu Suất với Web API AbortController & Axios isCancel  
**Tác giả**: Lập trình viên Frontend  
**Mục tiêu**: Mô tả quá trình hủy bỏ các request đang bay dở dang khi người dùng gõ phím liên tục trong ô Live Search.

---

## 1. Sơ Đồ Tuần Tự (Sequence Diagram - Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng (Gõ phím)
    participant UI as Giao diện Live Search
    participant Ctrl as AbortController Pool
    participant Axios as Axios Client (HTTP Signal)
    participant Server as Mock API Server

    Note over User, UI: Người dùng gõ ký tự thứ 1: "i"
    User->>UI: Input: "i"
    UI->>Ctrl: Khởi tạo Controller_1 (signal_1)
    UI->>Axios: axios.get('/search?q=i', { signal: signal_1 })
    Axios->>Server: [Req 1] Đang bay qua mạng (Độ trễ: 1200ms)...

    Note over User, UI: Người dùng gõ tiếp ký tự thứ 2: "ip" (sau 200ms)
    User->>UI: Input: "ip"
    UI->>Ctrl: controller_1.abort() [HỦY REQUEST 1 ĐANG BAY]
    Ctrl-->>Axios: Bắn tín hiệu AbortSignal(signal_1)
    Axios--xServer: [Req 1 BỊ CHẶN HỦY] Hủy kết nối mạng
    Axios-->>UI: Ném ngoại lệ CanceledError vào khối catch
    Note over UI: UI kiểm tra axios.isCancel(err) === true<br/>-> Bỏ qua an toàn, KHÔNG in console.error rác!

    UI->>Ctrl: Khởi tạo Controller_2 (signal_2)
    UI->>Axios: axios.get('/search?q=ip', { signal: signal_2 })
    Axios->>Server: [Req 2] Đang bay qua mạng (Độ trễ: 1000ms)...

    Note over User, UI: Người dùng gõ tiếp ký tự thứ 3: "iphone" (sau 250ms)
    User->>UI: Input: "iphone"
    UI->>Ctrl: controller_2.abort() [HỦY REQUEST 2 ĐANG BAY]
    Ctrl-->>Axios: Bắn tín hiệu AbortSignal(signal_2)
    Axios--xServer: [Req 2 BỊ CHẶN HỦY]
    Axios-->>UI: Catch CanceledError -> Bỏ qua

    UI->>Ctrl: Khởi tạo Controller_3 (signal_3)
    UI->>Axios: axios.get('/search?q=iphone', { signal: signal_3 })
    Axios->>Server: [Req 3] Đang bay qua mạng (Độ trễ: 400ms)...

    Note over Server, UI: Request 3 hoàn tất trước tiên!
    Server-->>Axios: [Req 3] Trả về 200 OK (Kết quả cho "iphone")
    Axios-->>UI: Response.data
    UI->>User: Cập nhật hiển thị kết quả "iPhone 16 Pro Max, iPhone 15..." (Chính xác 100%)
```

---

## 2. Giải Thích Cơ Chế Bẫy Dữ Liệu (Data Trap)

### Vấn đề:
Khi một request bị hủy bởi `controller.abort()`, Axios và Web API chuẩn sẽ coi đó là một lời từ chối và **ném một Exception vào khối `catch`**:
```typescript
// Ngoại lệ ném ra có dạng:
// AxiosError: canceled / CanceledError: canceled
```

### Hậu quả nếu không xử lý đúng:
Nếu lập trình viên chỉ viết:
```typescript
catch (err) {
  console.error("Lỗi mạng!", err); // RÁC CONSOLE!
  setError("Không thể tải kết quả tìm kiếm!"); // BÁO LỖI ẢO CHO USER!
}
```
Người dùng gõ 10 ký tự sẽ thấy màn hình nhấp nháy báo lỗi 9 lần!

### Giải pháp Chuẩn mực:
Sử dụng hàm phân loại chuyên dụng `axios.isCancel(err)`:
```typescript
try {
  const res = await axios.get('/search', { signal: controller.signal });
  setResults(res.data);
} catch (err) {
  if (axios.isCancel(err)) {
    // ĐÂY LÀ HÀNH VI CHỦ ĐỘNG HỦY CỦA HỆ THỐNG
    console.log("[Request Aborted]: Đã hủy bỏ request cũ thành công, không in lỗi.");
    return; // Dừng lại an toàn, không đổi UI!
  }
  // Các lỗi mạng thực sự khác:
  console.error("Lỗi mạng thực sự:", err);
  setErrorMessage("Không thể kết nối đến máy chủ.");
}
```

---

## 3. Ngăn Chặn Lỗi Race Condition
- **Không có Cancel**: Request 1 (tìm chữ "i") đi đường vòng mất 1500ms. Request 2 (tìm chữ "iphone") mất 400ms và về trước. Nhưng 1100ms sau, Request 1 mới về và ghi đè danh sách kết quả! &rarr; Người dùng đang gõ "iphone" nhưng màn hình lại hiện kết quả của chữ "i" (Lỗi Race Condition kinh điển).
- **Có Cancel**: Request 1 lập tức bị ngắt kết nối ngay khi người dùng gõ thêm chữ. Không bao giờ xảy ra tình trạng kết quả cũ ghi đè kết quả mới.
