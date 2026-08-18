# Báo cáo Phân tích & Thiết kế Kiến trúc - Bài 9: Máy đếm ngược Pomodoro

## 1. Thiết kế Kiến trúc & Sơ đồ Luồng (Architecture & Flow)

### Luồng Trạng Thái (Input/Output & State Transition)
Ứng dụng Pomodoro quản lý thời gian đếm ngược từ 25:00 phút về 00:00.

**Các State cần quản lý:**
1. `timeLeft` (Number): Tổng số giây còn lại cần đếm ngược. Khởi tạo: `1500` (tương đương 25 phút * 60 giây).
2. `isRunning` (Boolean): Trạng thái hoạt động của bộ đếm (đang chạy: `true`, tạm dừng/chưa chạy: `false`).

**Luồng chuyển đổi trạng thái (State Transition Flow):**
- **Nút Bắt đầu (Play):** Thiết lập `isRunning = true`. Kích hoạt một interval chạy mỗi `1000ms`, giảm `timeLeft` đi 1 đơn vị sau mỗi giây.
- **Nút Tạm dừng (Pause):** Thiết lập `isRunning = false`. Xóa bỏ interval hiện tại, đóng băng giá trị `timeLeft` hiện hành.
- **Nút Đặt lại (Reset):** Thiết lập `isRunning = false`, xóa interval và đưa `timeLeft` quay về giá trị mặc định ban đầu (`1500` giây).
- **Hết giờ (`timeLeft` về 0):** Ngăn chặn giá trị âm. Khi hiển thị `00:00`, tự động clear interval chạy ngầm, đổi trạng thái `isRunning = false`, in lên màn hình thông điệp thông báo `"Hết giờ!"`.

---

## 2. Ràng buộc kỹ thuật & Xử lý bẫy lỗi (Negative Time Prevention)

Trong vòng đời của bộ đếm ngược (Component Updation), khi trừ thời gian ta luôn kiểm tra điều kiện biên:
```javascript
tick() {
  this.setState((prevState) => {
    if (prevState.timeLeft <= 1) {
      clearInterval(this.timerID);
      return {
        timeLeft: 0,
        isRunning: false
      };
    }
    return {
      timeLeft: prevState.timeLeft - 1
    };
  });
}
```

Bẫy dữ liệu âm được xử lý triệt để: khi `timeLeft` chạm ngưỡng `<= 1`, hệ thống lập tức dọn dẹp bộ đếm `clearInterval` và đưa State `timeLeft` về đúng `0`. Đồng thời, trong hàm hiển thị JSX, biểu diễn thời gian dưới định dạng chuẩn `MM:SS` (sử dụng `.padStart` để bù số 0 ở hàng đơn vị).
