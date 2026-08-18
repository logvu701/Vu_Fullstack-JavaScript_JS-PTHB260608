# Báo cáo Phân tích - Bài 2: Lỗi không cập nhật State trong Class Component

## 1. Phân tích nguyên nhân (Logic Analysis)

Trong đoạn mã nguồn ban đầu của Class Component:
```javascript
handleAddToCart = () => {
  this.state.count = this.state.count + 1;
  console.log("Đã tăng:", this.state.count);
};
```

**Tại sao `console.log` in ra số tăng dần nhưng giao diện (UI) không cập nhật?**
- Trong React, state được xem là bất biến (immutable). Khi ta gán trực tiếp dữ liệu mới vào state thông qua biểu thức `this.state.count = this.state.count + 1`, ta đã trực tiếp chỉnh sửa (mutate) bộ nhớ trong của đối tượng `state`.
- Tuy nhiên, việc trực tiếp thay đổi thuộc tính của đối tượng `this.state` không kích hoạt bất kỳ sự kiện nào báo cho React biết hệ thống cần vẽ lại màn hình.
- React chỉ phát hiện sự thay đổi và lập lịch kích hoạt chu trình cập nhật (re-render) thông qua phương thức `this.setState()` (trong Class Component) hoặc hàm setter trả về từ hook `useState()` (trong Functional Component). Khi gọi phương thức này, React sẽ so sánh trạng thái trước và sau (Reconciliation), cập nhật Virtual DOM và vẽ lại UI thật tương ứng. Do đó, việc trực tiếp sửa `this.state` chỉ thay đổi giá trị trong bộ nhớ của biến (khiến `console.log` tăng lên) nhưng hoàn toàn bỏ qua quá trình cập nhật giao diện của React.

---

## 2. Giải pháp khắc phục (Implementation Resolution)

Sửa đổi phương thức `handleAddToCart` sử dụng phương thức `this.setState()` theo đúng quy chuẩn quản lý trạng thái của React:

```javascript
handleAddToCart = () => {
  this.setState((prevState) => ({
    count: prevState.count + 1
  }));
};
```

*Lưu ý:* Sử dụng phiên bản hàm của `setState` với `prevState` đảm bảo rằng giá trị của `count` được cập nhật chính xác dựa trên trạng thái trước đó ngay cả khi quá trình cập nhật trạng thái diễn ra bất đồng bộ và dồn (batching).
