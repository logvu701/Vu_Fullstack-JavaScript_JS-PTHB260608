# P4.5 - [Bài 5 - Khá] Tích hợp Mock Server và Thao tác CRUD

## 1. Mục tiêu & Bối cảnh
- **Bối cảnh**: Đội Backend đang chậm tiến độ, đội Frontend cần tự giả lập API để hoàn thiện màn hình Quản lý Danh bạ (Contacts).
- **Mục tiêu**: Thiết lập máy chủ giả lập RESTful sử dụng `json-server` tại cổng `3004`, khởi tạo cấu trúc cơ sở dữ liệu `db.json`, và viết các hàm gọi API sử dụng **Axios** để thực hiện trọn vẹn vòng đời CRUD:
  - `GET /contacts`: Lấy danh sách liên hệ.
  - `POST /contacts`: Thêm mới một liên hệ vào danh bạ.
  - `DELETE /contacts/:id`: Xóa một liên hệ theo ID.
- **Bẫy dữ liệu (Data Trap)**: Gửi lệnh `DELETE` một ID không tồn tại trên hệ thống (ví dụ: `ID: 999999`). Bắt và xử lý lỗi `404 Not Found` từ mock server trả về, bảo vệ ứng dụng không bị crash và hiển thị thông báo lỗi trực quan cho người dùng.

---

## 2. Cấu trúc Dự án
```
P4.5/
├── db.json                      # Cơ sở dữ liệu JSON khởi tạo cho mock server
├── package.json                 # Cấu hình scripts (dev, build, server) và dependencies
├── tsconfig.json                # TypeScript compiler config
├── vite.config.ts               # Vite configuration (port 5174)
├── tailwind.config.js           # Tailwind styling configuration
├── index.html                   # HTML template
└── src/
    ├── api/
    │   └── contactApi.ts        # Module Axios client: getContacts, addContact, deleteContact
    ├── components/
    │   ├── AddContactModal.tsx  # Form thêm mới danh bạ (kèm validation SĐT & Email)
    │   ├── DeleteTrapTestModal.tsx # Giao diện kiểm chứng bẫy dữ liệu 404
    │   └── NetworkLogModal.tsx  # Bộ theo dõi HTTP Request/Response thời gian thực
    ├── types/
    │   └── contact.ts           # Type definitions (Contact, CreateContactInput, ApiLogEntry)
    ├── App.tsx                  # Màn hình chính Dashboard quản lý danh bạ
    ├── index.css
    └── main.tsx
```

---

## 3. Hướng dẫn Khởi chạy

### Bước 1: Khởi động Mock Server (Cổng 3004)
Mở một cửa sổ Terminal tại thư mục `P4.5`:
```bash
npm run server
```
Mock Server sẽ chạy tại: `http://localhost:3004/contacts`

### Bước 2: Khởi động Ứng dụng Frontend (Vite)
Mở một cửa sổ Terminal khác tại thư mục `P4.5`:
```bash
npm run dev
```
Truy cập trình duyệt tại `http://localhost:5174`.

---

## 4. Phân tích Bẫy Dữ liệu: DELETE 404 Not Found

### Kịch bản Thử nghiệm:
1. Người dùng bấm nút **"Bẫy Lỗi DELETE 404"** trên thanh công cụ.
2. Modal thử nghiệm gửi yêu cầu: `DELETE http://localhost:3004/contacts/999999`.
3. Máy chủ `json-server` quét file `db.json`, không tìm thấy tài nguyên và phản hồi:
   - HTTP Status: `404 Not Found`
   - Response Body: `{}`
4. Axios coi mã trạng thái ngoài dải 2xx là một `AxiosError` và ném vào khối `catch`.

### Cơ chế Xử lý Kháng Lỗi:
```typescript
export async function deleteContact(id: string): Promise<{ success: boolean; id: string }> {
  try {
    await contactClient.delete(`/contacts/${id}`);
    return { success: true, id };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 404) {
        const customError = new Error(
          `[Bẫy dữ liệu 404 Not Found] Không tìm thấy liên hệ có ID "${id}" trên hệ thống mock server! Yêu cầu xóa thất bại.`
        );
        (customError as any).status = 404;
        (customError as any).isTrapCaught = true;
        throw customError;
      }
    }
    throw err;
  }
}
```
**Kết quả**: Ứng dụng không bị sập (White Screen of Death), giao diện chuyển hướng lỗi sang Alert Banner màu hổ phách giải thích chi tiết nguyên nhân, và nhật ký mạng ghi nhận chính xác mã 404.
