# P4.7 - [Bài 7 - Giỏi] Tự Động Hóa Định Danh với Request Interceptor

## 1. Mục tiêu & Bối cảnh
- **Mục tiêu**: Làm chủ cơ chế can thiệp vòng đời Request của Axios thông qua `axios.interceptors.request` để tự động tiêm (inject) các siêu dữ liệu cấu hình dùng chung (Access Token) vào Request Headers mà không cần đính kèm thủ công ở từng lời gọi hàm API.
- **Bối cảnh**: Hệ thống CRM yêu cầu mọi giao tiếp với máy chủ phải đính kèm chuỗi mã thông báo `Authorization: Bearer <token>` để xác thực. Việc gõ mã thủ công vào headers của hàng chục hàm API riêng rẽ dẫn đến lặp mã, dễ sai sót và khó bảo trì khi đổi cơ chế auth.
- **Bẫy dữ liệu (Data Trap)**: Nếu người dùng chưa đăng nhập hoặc token là `null` / `undefined`, Interceptor phải xử lý an toàn:
  - Bỏ qua việc gán header `Authorization`.
  - Tuyệt đối không làm sập ứng dụng (không sinh lỗi `Cannot read properties of undefined`).
  - Không được gửi các chuỗi rác như `"Bearer null"` hoặc `"Bearer undefined"`.
  - Để máy chủ tự đánh mã phản hồi chuẩn `401 Unauthorized`.

---

## 2. Cấu trúc Thư mục Dự án
```
P4.7/
├── request-headers-proof.svg         # Bằng chứng ảnh chụp Request Headers đã tiêm Token
├── public/
│   └── request-headers-proof.svg     # Tệp ảnh phục vụ hiển thị trực tiếp trên web
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── src/
    ├── api/
    │   └── crmClient.ts              # Axios instance với Request Interceptor tiêm Bearer Token
    ├── components/
    │   ├── NetworkHeaderInspector.tsx # Trình giám sát Request Headers thời gian thực
    │   └── ProofModal.tsx            # Hộp thoại hiển thị ảnh chụp bằng chứng
    ├── types/
    │   └── crm.ts                    # Type definitions (Customer, DealStat, NetworkInspection)
    ├── App.tsx                       # Màn hình CRM Dashboard tích hợp bộ chuyển đổi Auth
    ├── index.css
    └── main.tsx
```

---

## 3. Mã Nguồn Cốt Lõi: Request Interceptor

```typescript
crmClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    // Bẫy dữ liệu: Chỉ gắn header khi token hợp lệ
    if (token && typeof token === "string" && token.trim().length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Dọn dẹp header nếu chưa đăng nhập, không gửi 'Bearer null'
      if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
```

---

## 4. Hướng dẫn Khởi chạy
```bash
cd P4.7
npm install
npm run dev
```
Truy cập `http://localhost:5176`.
