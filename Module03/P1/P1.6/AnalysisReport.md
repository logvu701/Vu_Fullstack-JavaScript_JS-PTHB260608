# Báo cáo Phân tích - Bài 6: Form Đăng Nhập Kiểm Soát (Controlled Form)

## 1. Phân tích trạng thái dữ liệu (State Analysis)

Để quản lý và kiểm soát một biểu mẫu đăng nhập (Controlled Component) trong React, chúng ta cần lưu trữ và theo dõi các trạng thái (State) sau trong Component:
1. `username` (String): Lưu trữ tên đăng nhập do người dùng gõ vào ô nhập liệu. Khởi tạo: `""`.
2. `password` (String): Lưu trữ mật khẩu do người dùng nhập. Khởi tạo: `""`.
3. `errorMessage` (String): Lưu trữ thông báo lỗi khi dữ liệu nhập vào không hợp lệ. Khởi tạo: `""` (chuỗi rỗng nghĩa là không có lỗi).

---

## 2. Mô hình hoạt động và xử lý bẫy lỗi (Controlled Components & Validation)

### Nguyên lý Controlled Component
Mỗi thẻ `<input>` được liên kết chặt chẽ với một biến State:
- Thuộc tính `value` của input được gán bằng biến State.
- Sự kiện `onChange` bắt lấy ký tự người dùng gõ và cập nhật vào State thông qua hàm Handler, từ đó kích hoạt render lại giao diện hiển thị ký tự mới ngay lập tức.

### Xử lý bẫy lỗi khi Submit
Khi nhấn nút Đăng nhập (Submit/Click):
1. **Kiểm tra bỏ trống:** Nếu `username.trim() === ""` hoặc `password === ""`.
2. **Kiểm tra khoảng trắng:** Nếu `username` chứa khoảng trắng (sử dụng regex `/\s/` hoặc `.includes(' ')`).
- Nếu vi phạm bất kỳ điều kiện nào ở trên:
  - Thiết lập `errorMessage` thành `"Vui lòng kiểm tra lại thông tin"`.
  - Chặn đứng hành vi Submit (không in thông tin đăng nhập ra Console).
- Nếu dữ liệu hợp lệ:
  - Xóa sạch `errorMessage` (set về `""`).
  - In thông tin đăng nhập (`username`, `password`) ra màn hình Console.
