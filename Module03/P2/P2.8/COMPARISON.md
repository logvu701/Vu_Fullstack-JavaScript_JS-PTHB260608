# So sánh useState (lồng nhau) vs useReducer cho Kiên Trúc Giỏ Hàng

Đối tượng "Giỏ hàng" (gồm: mảng danh sách khóa học, mã giảm giá, và tổng tiền) là một cấu trúc dữ liệu phức hợp có các trường phụ thuộc lẫn nhau. Dưới đây là phân tích kỹ thuật về 2 cách tiếp cận.

## Bảng so sánh State

| Tiêu chí | Tiếp cận 1: useState lồng nhau hoặc nhiều useState rời rạc | Tiếp cận 2: useReducer tập trung |
| :--- | :--- | :--- |
| **Tính đồng nhất (Atomicity)** | **Kém:** Khi thay đổi danh sách khóa học, ta phải tính lại tổng tiền trực tuyến bằng một hàm khác. Nếu gọi nhiều `setX` liên tiếp (ví dụ: `setItems` rồi `setTotal`), React cập nhật bất đồng bộ và có thể gây lệch số liệu tạm thời hoặc render thừa nhiều lần. | **Tốt:** Toàn bộ trạng thái giỏ hàng được cập nhật đồng thời trong một chu kỳ render (Atomic update). Đảm bảo tổng tiền luôn khớp hoàn hảo với danh sách phần tử và mã giảm giá hiện tại. |
| **Logic Ràng buộc Toàn vẹn (Integrity Guards)** | Phân tán. Đoạn code kiểm tra trùng lặp phần tử nằm rải rác ở các handler trong component (Button Click, ...), gây khó khăn cho việc viết Unit Test và dễ rò rỉ lỗi logic. | Tập trung. Kiểm tra trùng lặp phần tử được xử lý trực tiếp tại Reducer Pure Function. Đảm bảo bất cứ hành động `ADD_ITEM` nào cũng phải đi qua lớp bảo vệ này. |
| **Độ phức tạp mã nguồn (Boilerplate)** | Thấp lúc đầu. Thích hợp cho ứng dụng nhỏ, ít logic tương tác phụ. | Cao hơn lúc đầu. Đòi hỏi viết các Action Types, Reducer và định nghĩa kiểu dữ liệu (TypeScript Discriminated Unions). |
| **Khả năng kiểm thử (Testability)** | Khó kiểm thử đơn lẻ (Unit Test) vì logic cập nhật bị ràng buộc chặt chẽ với component React (Life Cycle, scope variables). | Rất dễ. Đơn giản là viết bài test cho một hàm thuần túy `cartReducer(state, action)` mà không cần mount component React. |

## Kết luận chọn lựa: **useReducer**

Chúng tôi chọn `useReducer` cho hệ thống Giỏ hàng vì:
- Tránh được các lỗi bất đồng bộ khi cập nhật nhiều State liên quan.
- Gom toàn bộ logic vào pure function, giúp dễ dàng kiểm thử và bảo trì.
- Ràng buộc toàn vẹn dữ liệu được bảo vệ an toàn (chặn thêm trùng lặp khóa học).
