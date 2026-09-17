# BÁO CÁO PHÂN TÍCH CHUYÊN SÂU: PUT vs PATCH TRONG THIẾT KẾ RESTful API

**Dự án**: P4.6 - Module Cập nhật Hồ sơ Nhân sự  
**Tác giả**: Lập trình viên Frontend  
**Tiêu chuẩn tham chiếu**: RFC 7231 (HTTP/1.1 Semantics - PUT), RFC 5789 (PATCH Method for HTTP)

---

## 1. Bản chất Kỹ thuật: PUT vs PATCH

| Tiêu chí | Phương thức `PUT` (RFC 7231) | Phương thức `PATCH` (RFC 5789) |
| :--- | :--- | :--- |
| **Định nghĩa** | **Thay thế hoàn toàn** (Full Replacement / Overwrite). Biểu diễn mới gửi lên sẽ thay thế 100% biểu diễn cũ của tài nguyên. | **Sửa đổi từng phần** (Partial Modification). Chỉ gửi tập hợp các thay đổi (delta/diff) cần áp dụng lên tài nguyên. |
| **Idempotency (Lũy đẳng)** | **CÓ (Idempotent)**. Gọi lệnh PUT cùng payload $1$ lần hay $N$ lần thì trạng thái cuối cùng của tài nguyên trên Server vẫn y hệt nhau ($f(f(x)) = f(x)$). | **KHÔNG BẮT BUỘC**. Mặc dù thông thường việc gán giá trị mới mang tính lũy đẳng, nhưng chuẩn RFC 5789 cho phép các thao tác non-idempotent (như JSON Patch `add` vào mảng, hoặc tăng giá trị counter). |
| **Yêu cầu Payload** | Bắt buộc phải chứa **toàn bộ các trường** dữ liệu của tài nguyên (10/10 trường). | Chỉ cần chứa **các trường thay đổi** (ví dụ: 1/10 trường). |
| **Băng thông mạng (Payload Size)** | Lớn. Mỗi lần cập nhật dù chỉ 1 ký tự vẫn phải truyền tải toàn bộ đối tượng (Heavy traffic). | Rất nhỏ và tối ưu. Chỉ truyền tải đúng trường dữ liệu thay đổi (Lightweight). |
| **Trạng thái tài nguyên nếu thiếu trường** | Các trường không có trong payload sẽ bị **xóa bỏ, gán `null`, hoặc trả về giá trị mặc định** trên Server. | Các trường không có trong payload được **bảo toàn nguyên vẹn 100%**. |

---

## 2. Bẫy Nghiệp vụ (Business Trap): Gửi thiếu trường trong PUT

### Kịch bản Sự cố:
- Hồ sơ nhân sự bao gồm 10 trường: `id`, `fullName`, `email`, `phone`, `department`, `position`, `salary`, `avatar`, `status`, `address`.
- **Nhân viên A** chỉ muốn đổi số điện thoại từ `"0909123456"` sang `"0988776655"`.
- Lập trình viên Frontend gọi nhầm phương thức `axios.put('/users/EMP-2026', { phone: '0988776655' })`.

### Hậu quả trên Máy chủ RESTful Tiêu chuẩn:
1. Máy chủ tuân thủ RFC 7231 coi payload nhận được là **bản chụp toàn vẹn mới** của tài nguyên.
2. Máy chủ thực hiện ghi đè:
   ```json
   {
     "id": "EMP-2026",
     "phone": "0988776655"
   }
   ```
3. **9 trường dữ liệu còn lại bị xóa vĩnh viễn**:
   - `fullName` &rarr; `undefined` / `null` (Mất tên nhân viên).
   - `email` &rarr; `undefined` / `null` (Không thể gửi email thông báo).
   - `salary` &rarr; `undefined` / `null` (Mất thông tin lương bảo mật).
   - `department`, `position`, `status`, `address`, `avatar` &rarr; Biến mất khỏi Database.
4. **Hệ quả**: Làm sai lệch tính toàn vẹn dữ liệu (Data Corruption), gây lỗi NullPointerException ở các module khác (Bảng lương, Chấm công, Phân quyền).

---

## 3. Phân tích I/O (Input / Output) Thực tế

### 3.1. Kịch bản Nhân viên A: Đổi Số điện thoại bằng `PATCH` (Đúng chuẩn)
- **HTTP Method**: `PATCH`
- **Request URL**: `https://api.hrm.internal/v1/users/EMP-2026`
- **Request Payload (Input)**:
  ```json
  {
    "phone": "0988776655"
  }
  ```
- **Response Body (Output)**:
  ```json
  {
    "id": "EMP-2026",
    "fullName": "Đỗ Minh Khang",
    "email": "khang.do@rikkeiedu.vn",
    "phone": "0988776655",
    "department": "Công nghệ thông tin",
    "position": "Senior Fullstack Developer",
    "salary": 35000000,
    "avatar": "https://images.unsplash.com/...",
    "status": "Active",
    "address": "Tòa nhà Handico, Đường Phạm Hùng, Nam Từ Liêm, Hà Nội"
  }
  ```
  *Đánh giá*: Dữ liệu điện thoại được cập nhật mới, 9 trường còn lại được server giữ nguyên.

---

### 3.2. Kịch bản Nhân viên B: Ghi đè toàn bộ hồ sơ bằng `PUT` (Đúng chuẩn)
- **HTTP Method**: `PUT`
- **Request URL**: `https://api.hrm.internal/v1/users/EMP-2026`
- **Request Payload (Input)**:
  ```json
  {
    "fullName": "Đỗ Minh Khang",
    "email": "khang.do@rikkeiedu.vn",
    "phone": "0988776655",
    "department": "Khối R&D Công nghệ cao",
    "position": "Lead Software Architect",
    "salary": 48000000,
    "avatar": "https://images.unsplash.com/...",
    "status": "Active",
    "address": "Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội"
  }
  ```
- **Response Body (Output)**: Toàn bộ bản ghi được thay thế mới theo đúng ý định người dùng.

---

## 4. Bảng Đánh đổi (Trade-off Matrix) và Khuyến nghị Áp dụng

| Tình huống | Phương thức Khuyên dùng | Lý do Kiến trúc |
| :--- | :--- | :--- |
| **Cập nhật 1 vài trường (Toggle trạng thái, đổi avatar, đổi SĐT)** | **`PATCH`** | Tiết kiệm băng thông mạng 90%, giảm nguy cơ xung đột (Race condition) khi 2 người cùng sửa 2 trường khác nhau. |
| **Biểu mẫu chỉnh sửa toàn bộ (Edit Profile Form đầy đủ)** | **`PUT`** | Đảm bảo tính lũy đẳng (Idempotency). Dễ dàng rollback hoặc đồng bộ 1:1 với Form State. |
| **Tạo mới tài nguyên với Client-generated ID** | **`PUT`** | Cho phép tạo mới tài nguyên tại URL xác định nếu ID do Client quyết định trước. |
| **Ứng dụng Mobile / Mạng 3G/4G yếu** | **`PATCH`** | Giảm thiểu tối đa gói tin truyền tải, tăng tốc độ phản hồi. |
