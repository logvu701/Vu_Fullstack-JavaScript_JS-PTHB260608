# So sánh Giải pháp Cấu trúc Dữ liệu Trả về (Custom Hooks)

Khi thiết kế bộ đếm thời gian `useCountdown` tái sử dụng, chúng ta có 2 phương án cấu trúc dữ liệu trả về chính: **Tuple (Mảng cố định)** và **Object (Đối tượng)**. Dưới đây là bảng phân tích so sánh chi tiết.

## Bảng so sánh bộ đếm thời gian trả về

| Tiêu chí | Giải pháp 1: Tuple (ví dụ: `const [time, start, pause, reset] = useCountdown(60)`) | Giải pháp 2: Object (ví dụ: `const { time, start, pause, reset } = useCountdown(60)`) |
| :--- | :--- | :--- |
| **Cách triển khai kiểu dữ liệu (Types)** | Sử dụng `const` assertion (`as const`) hoặc định nghĩa kiểu mảng tường minh:<br>`[number, () => void, () => void, () => void] as const` | Định nghĩa Interface hoặc Type rõ ràng:<br>`{ time: number; start: () => void; ... }` |
| **Tính linh hoạt khi đổi tên (Aliasing)** | **Cực kỳ linh hoạt:** Người dùng có thể tự đặt tên biến tùy ý khi destructuring:<br>`const [quizTime, startQuiz] = useCountdown(60);` | **Kém linh hoạt hơn:** Cần dùng cú pháp đổi tên thuộc tính đối tượng:<br>`const { time: quizTime, start: startQuiz } = useCountdown(60);` |
| **Tính an toàn kiểu (Type-Safety)** | Rất cao nếu định nghĩa đúng vị trí và kiểu của từng phần tử. Tuy nhiên, nếu đổi nhầm thứ tự các phần tử khi destructuring, TypeScript sẽ gán sai kiểu. | Rất cao. Các thuộc tính được liên kết với tên cụ thể nên hoàn toàn không sợ lỗi thứ tự gán dữ liệu. |
| **Khả năng mở rộng (Extensibility)** | **Kém:** Khó thêm thuộc tính mới trong tương lai. Nếu thêm giá trị mới (ví dụ `isActive`), toàn bộ code cũ gọi hook sẽ bị ảnh hưởng hoặc phải destructuring thêm nhiều phần tử trống. | **Tốt:** Dễ dàng thêm các thuộc tính mới (ví dụ: `isActive`, `progress`) vào đối tượng trả về mà không làm hỏng code cũ. |
| **Tự tài liệu hóa (Self-documenting)** | Kém. Người dùng phải nhớ thứ tự các phần tử hoặc xem tooltip tài liệu. | Cực tốt. Tên thuộc tính phản ánh trực tiếp ý nghĩa của giá trị. |

## Lựa chọn đề xuất: **Object Return (Giải pháp 2)**

Chúng tôi quyết định lựa chọn **Phương án trả về dạng Object** vì:
1. **Dễ bảo trì và mở rộng:** Bộ đếm thời gian có khá nhiều trạng thái điều khiển (4-5 phần tử). Trả về Object cho phép dễ dàng tích hợp thêm các cờ trạng thái khác (như `isActive`, `progress`...) trong các phiên bản cập nhật mà không gây lỗi biên dịch hoặc phá hỏng API cũ.
2. **Khả năng tự tài liệu hóa (Self-documenting):** Giúp lập trình viên gọi hook nhanh chóng mà không cần tra cứu thứ tự mảng.
3. **Tránh lỗi gán nhầm:** Tránh được lỗi sai thứ tự biến khi destructuring mảng, mang lại sự an toàn kiểu cao nhất cho dự án lớn.
