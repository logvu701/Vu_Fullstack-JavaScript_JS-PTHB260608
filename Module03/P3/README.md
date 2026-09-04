# Module 03 - Phần 3: Kiến trúc State, Routing & Hiệu năng Nâng cao trong React

Bộ 6 dự án thực hành chuyên sâu chuẩn **React 18/19 + TypeScript + Vite + Tailwind CSS**, giải quyết triệt để các bài toán kiến trúc thực tế và các "bẫy dữ liệu" (Data Traps).

---

## 📑 Danh mục Dự án & Yêu cầu Nghiệp vụ

### 1. [P3.5 - [Bài 5 - Khá] Quản lý Trạng thái Toàn cục (Context API)](./P3.5)
- **Mục tiêu**: Khắc phục triệt để vấn đề Prop Drilling bằng `Context API` & `useContext`.
- **Nghiệp vụ**: Tính năng Dark Mode với `ThemeProvider` độc lập. Header chứa nút toggle, MainContent & Footer subscribe trực tiếp.
- **Bẫy dữ liệu**: Type-Safety chuẩn TypeScript. Xử lý ngoại lệ tường minh khi Consumer gọi `useTheme()` ngoài `ThemeProvider` thay vì ném lỗi `undefined`.

---

### 2. [P3.6 - [Bài 6 - Khá] Quản lý trạng thái thông qua URL](./P3.6)
- **Mục tiêu**: Đồng bộ hóa dữ liệu bộ lọc với thanh địa chỉ qua `useSearchParams` (`react-router-dom`).
- **Nghiệp vụ**: Tìm kiếm & lọc khóa học theo danh mục, cấp độ, sắp xếp. Hỗ trợ chia sẻ link kết quả (Deep Linking) và tự động khôi phục state khi tải lại trang.
- **Bẫy dữ liệu**: Khi xóa rỗng ô tìm kiếm hoặc reset bộ lọc, tham số được loại bỏ hoàn toàn bằng `searchParams.delete('q')`, không để lại các param rác như `?q=`.

---

### 3. [P3.7 - [Bài 7 - Giỏi] Trừu tượng hóa Logic trạng thái (Custom Hooks)](./P3.7)
- **Mục tiêu**: Thiết kế Custom Hook `useCountdown` tái sử dụng logic đếm ngược cho 2 phân hệ: **Bài thi trắc nghiệm (Quiz Timer)** và **Sự kiện Flash Sale**.
- **Nghiệp vụ**: Cung cấp đầy đủ phương thức `start`, `pause`, `reset`, `addSeconds`, `formattedTime`, `progressPercent`.
- **Bẫy dữ liệu**: Dọn dẹp bộ nhớ (cleanup `clearInterval`) khi unmount, tự động dừng và kích hoạt callback khi chạm mốc 0.
- **Đánh giá**: So sánh chi tiết 2 cấu trúc Return Type: **Object Return** vs **Tuple Return (`as const`)**.

---

### 4. [P3.8 - [Bài 8 - Giỏi] Điều phối trạng thái phức hợp (useReducer)](./P3.8)
- **Mục tiêu**: Gom toàn bộ logic Giỏ hàng (danh sách khóa học, mã voucher, tạm tính, giảm giá, tổng tiền) vào một `useReducer`.
- **Nghiệp vụ**: Xử lý các Action bằng Pure Reducer Function và ma trận **Discriminated Union Actions**.
- **Bẫy dữ liệu**: Ràng buộc toàn vẹn dữ liệu: Nếu khóa học đã có trong giỏ hàng, hành động "Thêm" bị từ chối an toàn và không làm sai lệch state.

---

### 5. [P3.9 - [Bài 9 - Xuất sắc] Kiến trúc luồng truy cập bảo mật (Protected Routes)](./P3.9)
- **Mục tiêu**: Thiết lập cơ chế định tuyến mệnh lệnh (Imperative Routing) và bảo vệ phân hệ **Phòng học ảo (Virtual Classroom)**.
- **Nghiệp vụ**: `ProtectedRoute` wrapper kiểm tra xác thực. Nếu chưa đăng nhập, tự động chuyển sang `/login` kèm `state: { from: location }`. Sau khi đăng nhập thành công, điều hướng quay lại đúng phòng học.
- **Bẫy dữ liệu**: Xử lý triệt để Browser History Stack với `{ replace: true }`, đảm bảo bấm nút "Back" trên trình duyệt không bị quay lại form Login.

---

### 6. [P3.10 - [Bài 10 - Xuất sắc] Tối ưu hóa ma trận hiệu năng hệ thống](./P3.10)
- **Mục tiêu**: Xử lý nút thắt cổ chai tính toán trên tập dữ liệu **5.000 học viên** bằng `useMemo`, `useCallback`, `React.memo`.
- **Nghiệp vụ**: Khóa bộ nhớ đệm kết quả lọc và thống kê; giữ nguyên tham chiếu các hàm sự kiện.
- **Bẫy dữ liệu**: Nút độc lập "Đã kiểm tra" (Audit Status) và Click Counter khi thao tác tuyệt đối **KHÔNG kích hoạt tính toán lại danh sách 5.000 học viên** (Bypass 0ms).
- **Đánh giá**: Báo cáo phân tích cơ chế bypass và tuân thủ Strict Equality (`===`).

---

## 🚀 Hướng dẫn Cài đặt & Chạy Dự án

Mỗi thư mục từ `P3.5` đến `P3.10` là một dự án Vite độc lập:

```bash
# Ví dụ chạy dự án P3.5:
cd P3.5
npm install
npm run dev

# Build kiểm tra TypeScript:
npm run build
```
