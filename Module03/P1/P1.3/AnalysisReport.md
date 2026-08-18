# Báo cáo Phân tích & Thiết kế - Bài 3: Quản lý Dữ liệu Danh sách Sản phẩm

## 1. Phân tích luồng dữ liệu (Input/Output) và Thiết kế

### Cấu trúc dữ liệu State đầu vào
Mảng danh sách các cuốn sách được lưu trữ dưới dạng một State tại Component cha (`BookStore`). Mỗi cuốn sách là một đối tượng có cấu trúc:
```json
{
  "id": "number | string",
  "name": "string",
  "author": "string"
}
```

### Sơ đồ truyền Props & Luồng dữ liệu (Prop Flow)
```
          +--------------------------------------------+
          |         BookStore (Component Cha)          |
          |  - Quản lý State: books (Mảng đối tượng)   |
          |  - Quản lý State: isEmpty (Dùng để test)   |
          +--------------------------------------------+
                                |
                   (Truyền Props chi tiết sách)
                                |
                                v
           +------------------------------------------+
           |          BookItem (Component Con)        |
           |  - Nhận props: book (id, name, author)  |
           |  - Render thông tin chi tiết từng sách   |
           +------------------------------------------+
```

- **Component Cha (`BookStore`)**: Khởi tạo mảng State ban đầu chứa dữ liệu mẫu. Nếu mảng trống hoặc rỗng `[]`, render ra giao diện thông báo lỗi: `"Hiện chưa có cuốn sách nào trong kho"`.
- **Component Con (`BookItem`)**: Nhận dữ liệu của một quyển sách qua prop `book` từ cha (`BookStore`) và hiển thị nó lên giao diện dưới dạng thẻ (card) gọn gàng, đẹp mắt.

## 2. Ràng buộc kỹ thuật & Xử lý bẫy ngoại lệ (Empty Array)
Để tránh hiện tượng trang trắng khi kho sách bị rỗng, trong phần render của Component cha ta sử dụng cấu trúc rẽ nhánh điều kiện:
```jsx
{books.length === 0 ? (
  <div className="empty-state">Hiện chưa có cuốn sách nào trong kho</div>
) : (
  <div className="books-grid">
    {books.map(book => <BookItem key={book.id} book={book} />)}
  </div>
)}
```
Đồng thời, thiết kế thêm một nút bấm để hoán đổi (toggle) trạng thái dữ liệu từ "mảng đầy đủ" sang "mảng rỗng []" nhằm mục đích kiểm tra và chạy thử bẫy dữ liệu này trực quan trên màn hình.
