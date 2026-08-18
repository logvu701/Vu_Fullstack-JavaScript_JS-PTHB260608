# Báo cáo Phân tích - Bài 5: Tái sử dụng Component Bảng Giá (Pricing Table)

## 1. Phân tích tham số đầu vào (Input Props Analysis)

Để phục vụ khả năng tái sử dụng tối đa của duy nhất một Component `PricingCard`, thiết kế các thuộc tính (Props) cần truyền vào từ Component cha như sau:
1. `tier` (String): Tên gói dịch vụ (ví dụ: "Basic", "Pro", "Enterprise").
2. `price` (Number | null): Giá tiền dịch vụ (ví dụ: `250000`, `990000`, `0` hoặc `null`).
3. `features` (Array of Strings): Danh sách các tính năng nổi bật đi kèm gói dịch vụ.
4. `isHighlighted` (Boolean): Có đánh dấu thẻ nổi bật hay không (thường cho gói bán chạy - Pro).
5. `bannerColor` (String): Mã màu chủ đạo của thẻ để cấu hình màu sắc viền/nút bấm (ví dụ: một giá trị hex hoặc class màu).

---

## 2. Xử lý bẫy ngoại lệ giá tiền (Conditional Pricing Rendering)

Đối với gói Enterprise hoặc gói không có giá cố định (`price` bằng `0`, `null`, hoặc `undefined`), sử dụng toán tử ba ngôi (Ternary Operator) trực tiếp bên trong JSX để tự động chuyển đổi hiển thị:

```jsx
<div className="card-price">
  {price && price > 0 ? (
    <>
      <span className="price-amount">{price.toLocaleString('vi-VN')}</span>
      <span className="price-unit"> VND / Tháng</span>
    </>
  ) : (
    <span className="price-contact">Liên hệ</span>
  )}
</div>
```

Giải pháp này ngăn chặn việc in ra chuỗi vô nghĩa `"0 VND"` trên giao diện của các gói tùy biến cao, trả về thông tin kêu gọi hành động định hướng (Call to action - "Liên hệ") trực quan cho người tiêu dùng.
