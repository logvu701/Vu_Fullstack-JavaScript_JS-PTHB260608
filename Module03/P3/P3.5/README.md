# Dự án P3.5: [Bài 5 - Khá] Đồng bộ Client State & Server State (Filter Dashboard)

## 1. Mục tiêu Dự án
- Tích hợp 2 công cụ mạnh mẽ: **Zustand** quản lý Client State (bộ lọc) và **TanStack Query** quản lý Server State (danh sách đơn hàng).
- Chèn trực tiếp State từ Zustand vào mảng `queryKey` của `useQuery: ['orders', { status, search, minAmount }]`.
- Khi người dùng tương tác với bộ lọc, TanStack Query tự động nhận diện Key thay đổi và kích hoạt re-fetch mà **tuyệt đối không cần dùng `useEffect`**.
- **Xử lý bẫy dữ liệu**: Tự động `.trim()` dữ liệu tìm kiếm tại action của Zustand store để tránh khoảng trắng thừa gây query rác.

## 2. Cấu trúc Thư mục
```
P3.5/
├── src/
│   ├── api/
│   │   └── orderApi.ts                 # Mock API lọc đơn hàng
│   ├── components/
│   │   ├── Header.tsx                  # Thanh tiêu đề và trạng thái sync
│   │   ├── FilterBar.tsx               # Bộ lọc Zustand (Status, Search, Min Amount)
│   │   ├── OrderTable.tsx              # Bảng danh sách đơn hàng TanStack Query
│   │   └── ArchitectureFlowModal.tsx   # Phân tích luồng I/O: UI -> Zustand -> TanStack
│   ├── store/
│   │   └── useFilterStore.ts           # Zustand Store xử lý .trim() bẫy dữ liệu
│   ├── types/
│   │   └── order.ts                    # TypeScript types
│   ├── App.tsx                         # QueryClientProvider & Root Layout
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
cd P3.5
npm install
npm run dev
npm run build
```
