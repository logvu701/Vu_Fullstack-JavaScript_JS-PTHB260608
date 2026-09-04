# Module 03 - Phần 3: Kiến trúc Quản lý Trạng thái Nâng cao (Zustand & TanStack Query)

Bộ 6 dự án thực hành chuyên sâu chuẩn **React 18 + TypeScript + Vite + Tailwind CSS + Zustand + TanStack Query v5**, giải quyết triệt để các bài toán kiến trúc Client State, Server State Cache, Optimistic Updates, Zustand Slices ngoài React và Module Quản lý Tồn kho End-to-End.

---

## 📑 Danh mục Dự án & Yêu cầu Nghiệp vụ

### 1. [P3.5 - [Bài 5 - Khá] Đồng bộ Client State & Server State (Filter Dashboard)](./P3.5)

- **Mục tiêu**: Tích hợp sức mạnh của 2 công cụ: **Zustand** lưu trạng thái bộ lọc (Filter) và **TanStack Query** lấy dữ liệu theo Filter đó.
- **Nghiệp vụ**:
  - Lưu trạng thái bộ lọc (`status`, `searchQuery`, `minAmount`) vào Zustand Client State.
  - Chèn trực tiếp State này vào mảng `queryKey: ['orders', { status, search: searchQuery, minAmount }]` của `useQuery`.
  - Tự động gọi lại API khi User chọn bộ lọc khác mà **không cần dùng `useEffect`**.
- **Bẫy dữ liệu**: Tự động `.trim()` khoảng trắng thừa ngay tại tầng Zustand trước khi truyền vào TanStack Query.
- **Tài liệu**: Modal sơ đồ luồng dữ liệu 1 chiều `Zustand ➔ QueryKey ➔ TanStack Query ➔ UI Table`.

---

### 2. [P3.6 - [Bài 6 - Khá] Quản lý Vòng đời Cache (StaleTime vs Background Refetch)](./P3.6)

- **Mục tiêu**: Làm chủ vòng đời Cache trong TanStack Query và tối ưu số lần gọi API qua cơ chế `staleTime` và `gcTime`.
- **Nghiệp vụ**:
  - Thiết lập `staleTime: 5 * 60 * 1000` (5 phút) và `gcTime: 10 * 60 * 1000` (10 phút).
  - Chuyển đổi linh hoạt giữa các Tab (Doanh thu & Nhân sự), dữ liệu cũ hiển thị tức thì $0.0s$ từ Cache mà không quay lại vòng tải (Fresh state).
  - Nút "Force Refresh (Làm mới ngay)" gọi hàm `refetch()` bỏ qua quy tắc staleTime để lấy dữ liệu mới nhất.
- **Trực quan hóa**: Widget hiển thị trạng thái vòng đời Cache thời gian thực: `Fetching` ➔ `Fresh` ➔ `Stale` ➔ `Inactive`.
- **Tài liệu**: Bảng ma trận so sánh chi tiết giữa `staleTime` (Độ tươi mới) và `gcTime` (Thời gian thu hồi rác bộ nhớ).

---

### 3. [P3.7 - [Bài 7 - Giỏi] Phân tích UX Trạng thái Tải dữ liệu (isLoading vs isFetching)](./P3.7)

- **Mục tiêu**: Phân biệt bản chất giữa `isLoading` (Hard Loading - Chưa có dữ liệu trong Cache) và `isFetching` (Background Sync - Đang đồng bộ dữ liệu ngầm).
- **Nghiệp vụ**:
  - **Giải pháp 1 (UX Kém)**: Dùng `isFetching` để chặn toàn màn hình và quay Fullscreen Spinner mỗi lần đồng bộ ngầm &rarr; Gây giật lag, đứt gãy tương tác người dùng.
  - **Giải pháp 2 (UX Tối ưu)**: Dùng `isLoading` hiển thị Skeleton Placeholder khi tải lần đầu; dùng `isFetching` hiển thị thanh tiến trình / pulsing badge tinh tế ở góc giao diện mà không chặn tương tác.
- **Bẫy dữ liệu**: Không dùng `isLoading` cho các tác vụ Background Polling / Refetch vì `isLoading` luôn trả về `false` khi cache đã tồn tại dữ liệu.

---

### 4. [P3.8 - [Bài 8 - Giỏi] Trải nghiệm Thời gian thực (Optimistic Updates)](./P3.8)

- **Mục tiêu**: Tạo cảm giác ứng dụng phản hồi ngay lập tức ($t = 0.0s$) bằng `onMutate` và cơ chế phòng thủ tự động hoàn tác (**Rollback**) bằng `onError`.
- **Nghiệp vụ**:
  - Nhân viên bấm *"Đánh dấu Đã xử lý"* cho đơn hàng vi phạm.
  - `onMutate`: Gọi `cancelQueries(['disputes'])`, chụp snapshot `previousDisputes`, và cập nhật Cache sang `Resolved` ngay tức thì.
  - `onError`: Tự động khôi phục dữ liệu từ Snapshot khi máy chủ gặp sự cố (HTTP 500) kèm Error Toast.
  - `onSettled`: Luôn kích hoạt `invalidateQueries` để đồng bộ 100% với cơ sở dữ liệu Backend.
- **Trực quan hóa**: Timeline Log ghi nhận sự kiện từng mili-giây và chế độ mô phỏng lỗi Server 500.

---

### 5. [P3.9 - [Bài 9 - Xuất sắc] Kiến trúc Zustand Slices & Vanilla JS (Ngoài React)](./P3.9)

- **Mục tiêu**: Tách biệt Store lớn thành các lát cắt (`authSlice`, `uiSlice`), kết hợp thành `useBoundStore`, và sử dụng Zustand bên ngoài React trong Axios Interceptors.
- **Nghiệp vụ**:
  - `authSlice.ts`: Quản lý `token`, `user`, `login`, `logout`.
  - `uiSlice.ts`: Quản lý `theme`, `toasts`, `toggleTheme`, `addToast`.
  - `axiosClient.ts`: Đọc token trực tiếp qua `useBoundStore.getState().token` trong Request Interceptor để đính kèm `Authorization: Bearer <token>`.
  - Response Interceptor: Tự động bắt lỗi 401/403 và phát Toast cảnh báo qua `useBoundStore.getState().addToast()`.
- **Bẫy dữ liệu**: Khi `token === null` (đã đăng xuất), Request Interceptor an toàn loại bỏ header `Authorization`, tuyệt đối không gửi `Bearer null`.

---

### 6. [P3.10 - [Bài 10 - Xuất sắc] Phát triển Module Quản lý Tồn kho (End-to-End State)](./P3.10)

- **Mục tiêu**: Phối hợp toàn diện giữa **TanStack Query** (Server State Cache & Mutations) và **Zustand** (Client UI State & Drawer Interaction).
- **Nghiệp vụ**:
  - Bảng tồn kho thời gian thực với phân loại trạng thái: Còn hàng, Sắp hết hàng (&le; 10), Hết hàng (= 0).
  - Bấm *"Điều chỉnh"* &rarr; Zustand mở Sidebar Drawer trượt từ bên phải (`openSidebar(item)`).
  - Điều chỉnh Nhập thêm (+), Xuất bớt (-), hoặc Ghi đè số lượng tuyệt đối.
  - Gửi `useMutation` lên Backend. Khi thành công (`onSuccess`): Zustand đóng Drawer + TanStack Query làm mới Server Cache + Kích hoạt Toast notification.
- **Bẫy dữ liệu**: Chặn số lượng tồn kho âm ($< 0$) và chặn vượt định mức tối đa ($> 10,000$ cái).

---

## 🚀 Hướng dẫn Cài đặt & Chạy Dự án

Mỗi thư mục từ `P3.5` đến `P3.10` là một dự án độc lập:

```bash
# Ví dụ chạy dự án P3.10:
cd P3.10
npm install
npm run dev

# Build kiểm tra TypeScript:
npm run build
```
