# Dự án P3.7: [Bài 7 - Giỏi] Phân tích UX Trạng thái Tải dữ liệu (isLoading vs isFetching)

## 1. Mục tiêu Dự án
- Phân biệt rõ ràng sự khác nhau giữa **Tải lần đầu** (`isLoading = true` / `isPending && isFetching`) và **Tải ngầm** (`isFetching = true && !isLoading`).
- So sánh 2 giải pháp giao diện người dùng:
  - **Giải pháp 1 (Lỗi UX)**: Dùng chung một màn hình Fullscreen Spinner che kín bảng cho mọi trạng thái tải, gây gián đoạn thao tác khi có background refetch.
  - **Giải pháp 2 (Chuẩn UX)**: Tách biệt: Dùng **Skeleton Loading** cho lần tải đầu tiên, và dùng **Soft Floating Pulse/Corner Indicator** cho lần tải ngầm, giữ nguyên bảng dữ liệu cho phép tương tác liên tục.
- Lập bảng so sánh Ưu/Nhược điểm và chốt Giải pháp 2 làm quy chuẩn tối ưu.

## 2. Cấu trúc Thư mục
```
P3.7/
├── src/
│   ├── api/
│   │   └── customerApi.ts              # Mock API khách hàng (delay 1.2s)
│   ├── components/
│   │   ├── Header.tsx                  # Nút switch Giải pháp 1/2 & Trigger Refetch ngầm
│   │   ├── CustomerTableSolution1.tsx  # Giao diện Giải pháp 1 (Hard Loading)
│   │   ├── CustomerTableSolution2.tsx  # Giao diện Giải pháp 2 (Skeleton + Soft Loading)
│   │   └── UXComparisonModal.tsx       # Báo cáo so sánh UX chi tiết
│   ├── types/
│   │   └── customer.ts                 # TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
cd P3.7
npm install
npm run dev
npm run build
```
