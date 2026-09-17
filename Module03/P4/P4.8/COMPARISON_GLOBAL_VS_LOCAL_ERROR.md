# BẢNG PHÂN TÍCH ĐA GIẢI PHÁP: GLOBAL ERROR HANDLING vs LOCAL TRY-CATCH

**Dự án**: P4.8 - Xây dựng Trạm Kiểm soát Phản hồi Toàn cục (Axios Response Interceptor)  
**Tác giả**: Lập trình viên Frontend  
**Vấn đề cốt lõi**: Khi phiên đăng nhập hết hạn (Server trả về mã HTTP `401 Unauthorized`), làm sao để điều hướng người dùng về trang Đăng nhập và dọn dẹp phiên làm việc một cách tối ưu nhất?

---

## 1. Bảng Ma Trận So Sánh Đa Giải Pháp

| Tiêu chí Đánh giá | Giải pháp 1: Response Interceptor (Tập trung / Global) | Giải pháp 2: Khối catch ở từng API (Phân tán / Local) |
| :--- | :--- | :--- |
| **Tính lặp lại mã (DRY - Don't Repeat Yourself)** | **Xuất sắc (10/10)**: Viết đúng 1 lần duy nhất tại file cấu hình Axios client. Toàn bộ hàng trăm API tự động thừa hưởng cơ chế xử lý. | **Rất kém (2/10)**: Phải sao chép khối `if (err.response?.status === 401) { navigate('/login') }` vào hàng chục, hàng trăm hàm gọi API. |
| **Độ dễ bảo trì (Maintainability)** | **Rất cao (9.5/10)**: Khi nghiệp vụ thay đổi (ví dụ: chuyển từ `/login` sang `/sso-login`, hoặc thêm luồng Refresh Token ngầm), chỉ cần sửa 1 hàm duy nhất trong Interceptor. | **Cực kỳ thấp (1/10)**: Phải rà soát và sửa đổi thủ công trên mọi component và file API. Rất dễ sót (omission risk). |
| **Tính nhất quán trải nghiệm người dùng (UX Consistency)** | **Tuyệt đối**: Bất kể người dùng đang ở Modal, Drawer, Tab nào hay đang gọi API ngầm, lỗi 401 đều kích hoạt cùng một thông báo và điều hướng chuẩn xác. | **Không nhất quán**: Một số màn hình có thể quên xử lý 401 dẫn đến màn hình treo vô tận, quay spinner mãi mãi hoặc chỉ `console.error`. |
| **Tách biệt mối bận tâm (Separation of Concerns)** | **Chuẩn mực**: Tầng UI chỉ tập trung nhận dữ liệu và hiển thị. Không bị ô nhiễm bởi các logic hạ tầng (Infrastructure concerns) như Auth redirect hay Token refresh. | **Vi phạm**: Tầng UI Component bị trộn lẫn logic xử lý hạ tầng mạng và phiên đăng nhập. |
| **Khả năng mở rộng (Scalability - Silent Token Refresh)** | **Cực mạnh**: Dễ dàng biến Response Interceptor thành cơ chế **Silent Token Refresh** (gọi `/refresh-token` và thử lại `axios(originalRequest)` một cách liền mạch). | **Không khả thi**: Không thể thực hiện retry queue và silent refresh ở từng khối catch cục bộ. |
| **Độ linh hoạt với lỗi cục bộ (Local Override)** | Có thể phối hợp: Interceptor xử lý lỗi chung (401, 500), sau đó vẫn `return Promise.reject(error)` để component bắt các lỗi nghiệp vụ riêng (như 422 Validation). | Linh hoạt nhưng phân tán, thiếu quy chuẩn. |

---

## 2. Minh Họa Mã Nguồn Đối Chứng

### 2.1. Tiếp cận Phân tán (Local try/catch - Phản mẫu / Anti-pattern)
```typescript
// Component A (Khách hàng)
async function loadCustomers() {
  try {
    const res = await axios.get('/customers');
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login'; // Lặp lại!
    }
  }
}

// Component B (Đơn hàng)
async function loadOrders() {
  try {
    const res = await axios.get('/orders');
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login'; // Lặp lại lần 2!
    }
  }
}
// Nhân lên 100 lần cho 100 màn hình trong hệ thống!
```

### 2.2. Tiếp cận Tập trung (Axios Response Interceptor - Chuẩn kiến trúc Clean Code)
```typescript
// axiosClient.ts (1 NƠI DUY NHẤT)
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // 1. Dọn dẹp trạng thái xác thực
      authStore.clearToken();
      
      // 2. Phát thông báo lỗi tập trung
      toast.error('Phiên đăng nhập đã hết hạn. Đang chuyển hướng về trang Đăng nhập...');
      
      // 3. Tự động điều hướng Login
      navigationService.redirectToLogin();
    }

    return Promise.reject(error);
  }
);
```

---

## 3. Kết luận và Khuyến nghị của Kiến trúc sư
- **Giải pháp Interceptor tập trung** là tiêu chuẩn bắt buộc (Defacto Standard) cho các ứng dụng Frontend hiện đại (React, Vue, Angular).
- Tiết kiệm 85% thời gian viết mã xử lý lỗi mạng, loại bỏ hoàn toàn các lỗi sót kiểm tra phiên (Missing Auth Check), và mở ra nền tảng cho kiến trúc làm mới Token tự động (Auto Refresh Token Rotation).
