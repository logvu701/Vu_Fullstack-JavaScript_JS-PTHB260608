# Báo cáo Phân tích - Bài 7: Phân tích Render có điều kiện (Conditional Rendering)

## 1. Đề xuất các giải pháp (Proposed Solutions)

Để giải quyết yêu cầu điều khiển ẩn/hiện banner tương ứng với trạng thái đăng nhập (`isLoggedIn`), ta phân tích hai giải pháp phổ biến trong React:

### Giải pháp 1: Sử dụng cấu trúc `if-else` truyền thống bên ngoài lệnh `return`
```jsx
function WelcomeBanner({ isLoggedIn, onLogin, onLogout }) {
  if (isLoggedIn) {
    return (
      <div className="banner welcome">
        <h2>Chào mừng trở lại!</h2>
        <button onClick={onLogout}>Đăng xuất</button>
      </div>
    );
  } else {
    return (
      <div className="banner login-prompt">
        <h2>Vui lòng đăng nhập để tiếp tục</h2>
        <button onClick={onLogin}>Đăng nhập ngay</button>
      </div>
    );
  }
}
```

### Giải pháp 2: Sử dụng toán tử ba ngôi `? :` trực tiếp bên trong cú pháp JSX `return`
```jsx
function WelcomeBanner({ isLoggedIn, onLogin, onLogout }) {
  return (
    <div className="banner-container">
      {isLoggedIn ? (
        <div className="banner welcome">
          <h2>Chào mừng trở lại!</h2>
          <button onClick={onLogout}>Đăng xuất</button>
        </div>
      ) : (
        <div className="banner login-prompt">
          <h2>Vui lòng đăng nhập để tiếp tục</h2>
          <button onClick={onLogin}>Đăng nhập ngay</button>
        </div>
      )}
    </div>
  );
}
```

---

## 2. So sánh và lựa chọn giải pháp tối ưu (Comparison & Selection)

| Tiêu chí | Giải pháp 1 (`if-else` ngoài `return`) | Giải pháp 2 (Toán tử ba ngôi inline) |
| :--- | :--- | :--- |
| **Tính ngắn gọn** | Dài dòng hơn khi phải viết nhiều cấu trúc `return` lặp lại. | Rất ngắn gọn, gom tất cả logic render vào một khối `return` duy nhất. |
| **Khả năng lồng ghép**| Khó lồng ghép trực tiếp vào bố cục HTML bao quanh (Layout wrapper). | Dễ dàng nhúng và lồng trực tiếp vào bất kỳ thẻ HTML nào của giao diện. |
| **Độ rõ ràng** | Thích hợp khi giao diện của hai khối rendering hoàn toàn độc lập, khác biệt rõ ràng, hoặc khi cần tính toán tiền xử lý trước khi render. | Thích hợp cho việc chuyển đổi luồng hiển thị nhanh chóng, trực quan của cùng một vùng nội dung. |

### Lựa chọn của nhóm:
Chọn **Giải pháp 2 (Toán tử ba ngôi inline)** bởi vì nó giữ cho code gọn gàng, duy trì cấu trúc thẻ bao bọc ngoài đồng nhất và trực quan ngay trong khối JSX mà không cần phân tán thành nhiều lệnh `return` riêng biệt.
