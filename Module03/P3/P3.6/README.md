# Dự án P3.6: [Bài 6 - Khá] Quản lý Vòng đời Cache (StaleTime vs Background Refetch)

## 1. Mục tiêu Dự án
- Cấu hình TanStack Query với `staleTime: 5 * 60 * 1000` (5 phút "Fresh") và `gcTime: 10 * 60 * 1000` (10 phút).
- Khi người dùng chuyển đổi qua lại giữa Tab Doanh thu (Revenue) và Tab Nhân sự (Staff), dữ liệu được lấy ngay lập tức từ bộ nhớ đệm (0ms delay, không quay spinner).
- **Xử lý bẫy dữ liệu**: Tích hợp nút **"Làm mới Dữ liệu" (Force Refresh)** gọi `refetch()` để chủ động bỏ qua staleTime và gọi lại API ngay lập tức khi cần số liệu mới nhất.
- Trực quan hóa 4 trạng thái vòng đời Cache: `Fetching` ➔ `Fresh` ➔ `Stale` ➔ `Inactive`.

## 2. Cấu trúc Thư mục
```
P3.6/
├── src/
│   ├── api/
│   │   └── dashboardApi.ts             # Mock API doanh thu (delay 2s) & nhân sự
│   ├── components/
│   │   ├── Header.tsx                  # Điều hướng tab Doanh thu / Nhân sự
│   │   ├── CacheLifecycleVisualizer.tsx# Monitor trạng thái vòng đời Cache thời gian thực
│   │   ├── RevenueTab.tsx              # Thống kê doanh thu & Nút Force Refresh
│   │   ├── StaffTab.tsx                # Danh sách nhân sự
│   │   └── CacheDocModal.tsx           # Báo cáo kỹ thuật vòng đời Cache
│   ├── types/
│   │   └── dashboard.ts                # TypeScript types
│   ├── App.tsx                         # Cấu hình QueryClient staleTime 5m
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
cd P3.6
npm install
npm run dev
npm run build
```
