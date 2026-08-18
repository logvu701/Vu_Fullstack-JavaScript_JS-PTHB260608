# Báo cáo Phân tích - Bài 4: Quản lý Vòng đời Component và Bộ nhớ (Life-Cycle)

## 1. Phân tích lỗi rò rỉ bộ nhớ (Memory Leak Analysis)

Trong các ứng dụng chạy ngầm sử dụng `setInterval`, `addEventListener`, hoặc kết nối WebSocket:
- Khi một Component được tạo ra và đưa vào cây DOM (Mounting), ta khởi tạo bộ đếm thời gian bằng `setInterval`.
- Khi người dùng chuyển trang hoặc ẩn Component đó đi, Component sẽ đi vào giai đoạn hủy (Unmounting). React loại bỏ sự tồn tại của Component trong DOM và giải phóng các tài nguyên trực quản của nó.
- **Vấn đề:** Trình duyệt và Node.js không tự động hủy hàm `setInterval` chỉ vì Component chứa nó đã chết. Bộ đếm `setInterval` vẫn tiếp tục chạy ngầm trong bộ nhớ (heap), liên tục cố gắng truy xuất và cập nhật giá trị State của một Component không còn tồn tại trên giao diện. Điều này dẫn đến sự tích tụ các luồng xử lý chạy ngầm vô dụng gây hao tổn tài nguyên hệ thống (CPU, RAM) - được gọi là **Rò rỉ bộ nhớ (Memory Leak)**, và có thể bắn ra các cảnh báo lỗi đỏ trong console của React.

---

## 2. Giải pháp khắc phục hiệu quả (Implementation Details)

Sử dụng chu trình vòng đời của Class Component để quản lý:
1. **Khởi tạo (`componentDidMount`):** Cài đặt `setInterval` để cập nhật thời gian mỗi giây vào State, đồng thời lưu giữ ID của Timer này vào một thuộc tính instance (ví dụ: `this.timerID`).
2. **Dọn dẹp (`componentWillUnmount`):** Gọi lệnh `clearInterval(this.timerID)` để lập tức triệt tiêu luồng chạy ngầm của bộ đếm thời gian ngay trước khi Component bị gỡ bỏ hoàn toàn khỏi DOM.

```javascript
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}

componentWillUnmount() {
  clearInterval(this.timerID);
}
```
Bằng cách quản lý chặt chẽ chu trình sinh - tử như trên, toàn bộ bộ nhớ và tiến trình chạy ngầm được dọn dẹp sạch sẽ, giúp hệ thống hoạt động ổn định và tối ưu hiệu năng.
