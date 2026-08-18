# Báo cáo Phân tích - Bài 8: Tối ưu hiệu năng Lifecycle (shouldComponentUpdate)

## 1. Đề xuất các hướng tiếp cận (Proposed Approaches)

Khi Component con (`ScoreBoard`) nhận điểm số (`score`) từ Component cha truyền xuống đều đặn mỗi giây một lần (cho dù điểm số có thay đổi hay không), ta phân tích 2 hướng tiếp cận để xử lý:

### Hướng 1: Để mặc định của React (Không can thiệp)
- **Cách hoạt động:** React sẽ tiến hành so sánh ảo và render lại Component con ScoreBoard mỗi khi Component cha render lại và truyền dải prop mới (dù giá trị `score` giữ nguyên).
- **Hậu quả:** Hàm `render()` của Component con chạy liên tục mỗi giây. Với giao diện phức tạp có chứa biểu đồ, hoạt họa hoặc dữ liệu hiển thị nặng khác, điều này sẽ tạo gánh nặng lớn cho CPU, gây lãng phí tài nguyên và làm đơ lag giao diện (UI Lag).

### Hướng 2: Can thiệp thủ công vào vòng đời bằng `shouldComponentUpdate`
- **Cách hoạt động:** Trong Class Component, ta định nghĩa phương thức `shouldComponentUpdate(nextProps, nextState)`. Ta so sánh giá trị prop cũ và prop mới:
```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.score !== this.props.score;
}
```
- **Kết quả:** Nếu `nextProps.score` trùng hợp với `this.props.score` hiện tại, hàm trả về `false`. React lập tức hủy bỏ luồng cập nhật của component này, hàm `render()` không bị gọi lại, giúp giảm tải tối đa cho trình duyệt.

---

## 2. Giải pháp cài đặt hiệu năng tối ưu (Implementation Selection)

Chúng tôi lựa chọn **Hướng 2 (Dùng shouldComponentUpdate)** để tối ưu hóa hiệu năng render của ScoreBoard:
- Thiết kế một Class Component `ScoreBoard` cài đặt `shouldComponentUpdate`.
- Thêm dấu vết `console.log("[ScoreBoard] Render được gọi!")` bên trong hàm `render()` để kiểm chứng.
- Ở phía màn hình, khi Component cha gửi lặp đi lặp lại cùng một điểm số cũ theo chu kỳ giây, console log render sẽ không hiển thị (hoàn toàn bị chặn thành công). Chỉ khi điểm số thực sự thay đổi (tăng điểm), log render mới xuất hiện, chứng minh hiệu năng đã được tối ưu hóa thành công.
