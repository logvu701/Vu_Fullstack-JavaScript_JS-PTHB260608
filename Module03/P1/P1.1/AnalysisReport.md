# Báo cáo Phân tích - Bài 1: Lỗi Cú pháp JSX và Props

## 1. Phân tích nguyên nhân (Logic Analysis)

Trong đoạn mã nguồn ban đầu của thực tập sinh:
```jsx
function UserProfile(props) {
  return (
    <div className="card">
      <h1>Tên nhân viên: props.name</h1>
      <p>Chức vụ: props.role</p>
    </div>
  );
}
```

**Lý do lỗi:**
- Trong cú pháp JSX của React, trình biên dịch JSX (như Babel hay SWC) xử lý các nội dung văn bản bên trong thẻ HTML thông thường dưới dạng chuỗi văn bản tĩnh (string literal).
- Để nhúng biểu thức JavaScript động (như biến, thuộc tính đối tượng hoặc kết quả của một hàm) vào trong JSX, chúng ta phải bao bọc biểu thức đó trong cặp dấu ngoặc nhọn `{}`.
- Do thiếu cặp dấu ngoặc nhọn xung quanh `props.name` và `props.role`, React hiểu đó là nội dung văn bản tĩnh thuần túy và in trực tiếp dòng chữ thô `"props.name"` và `"props.role"` lên màn hình.

---

## 2. Giải pháp khắc phục (Implementation Resolution)

Sử dụng cặp dấu ngoặc nhọn `{}` để báo cho công cụ phân tích JSX biết đây là các biểu thức JavaScript cần được tính toán và nội suy giá trị thực từ đối tượng `props`:
```jsx
function UserProfile(props) {
  return (
    <div className="card">
      <h1>Tên nhân viên: {props.name}</h1>
      <p>Chức vụ: {props.role}</p>
    </div>
  );
}
```

*Trong dự án thực tế, ta có thể sử dụng cú pháp Destructuring để rút gọn code:*
```jsx
function UserProfile({ name, role }) {
  return (
    <div className="card">
      <h1>Tên nhân viên: {name}</h1>
      <p>Chức vụ: {role}</p>
    </div>
  );
}
```
