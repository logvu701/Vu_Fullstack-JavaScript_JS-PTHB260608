# Dự án P3.10: [Bài 10 - Xuất sắc] Tối ưu hóa Ma trận Hiệu năng Hệ thống

## 1. Mục tiêu Dự án
- Xử lý các nút thắt cổ chai tính toán khi quản lý và lọc danh sách **5.000 học viên** thông qua cơ chế khóa bộ nhớ đệm `useMemo` và `useCallback`, `React.memo`.
- Ngăn chặn việc thực thi vòng lặp lặp lại nếu dữ liệu nguồn (dependencies) không bị biến đổi theo chuẩn **Strict Equality (`===`)**.
- **Xử lý bẫy dữ liệu**: Tích hợp tính năng độc lập nút đánh dấu "Đã kiểm tra" (Audit Status) và Click Counter. Thao tác trên các nút này kích hoạt component re-render nhưng **tuyệt đối KHÔNG kích hoạt tiến trình tính toán lại danh sách 5.000 học viên** (Bypass thành công 100%).
- Cung cấp Real-time Performance Profiler đo lường thời gian thực thi (ms) và số lần chạy hàm tính toán.

## 2. Cấu trúc Thư mục
```
P3.10/
├── src/
│   ├── components/
│   │   ├── Header.tsx                   # Nút chuyển đổi Optimized / Unoptimized Mode
│   │   ├── PerformanceProfiler.tsx      # Dashboard đo lường thời gian thực thi & số lần tính
│   │   ├── AuditHeaderPanel.tsx         # Bẫy dữ liệu: Nút độc lập kiểm chứng không recalculate
│   │   ├── FilterToolbar.tsx            # Memoized Filter controls
│   │   ├── StudentTable.tsx             # Memoized Table & StudentRow components
│   │   └── PerformanceReportModal.tsx   # Báo cáo phân tích chuyên sâu về Re-render & Memoization
│   ├── types/
│   │   └── student.ts                   # Types cho học viên, bộ lọc, thống kê
│   ├── utils/
│   │   ├── generateStudents.ts          # Tạo dataset 5.000 học viên xác định
│   │   └── heavyComputation.ts          # Thuật toán tính toán độ lệch chuẩn, lọc và sắp xếp
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Báo cáo Cơ chế Bypass Bộ nhớ Đệm
1. **useMemo Dependency Array**: `[allStudents, filters.searchQuery, filters.selectedDepartment, filters.minGPA, filters.sortBy]`.
2. **Khi click nút "Đã kiểm tra"**: Chỉ có state `isAuditedAll` thay đổi. Các dependencies của `useMemo` giữ nguyên giá trị `===`.
3. **Kết quả**: React bypass hàm tính toán nặng, trả về kết quả trong bộ nhớ đệm ngay tức khắc (0ms), giữ giao diện mượt mà 60fps.

## 4. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.10

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```
