# P3.10: [Bài 10 - Xuất sắc] Phát triển Module Quản lý Tồn kho (End-to-End State)

Dự án hoàn chỉnh triển khai mô hình **End-to-End State Architecture** kết hợp đồng bộ 2 chiều giữa **TanStack Query v5** (Server State, Query Caching & Mutations) và **Zustand** (Client UI State & Drawer Interaction), đi kèm hệ thống kiểm định tính toàn vẹn dữ liệu (Bẫy số âm & Định mức tối đa).

---

## 🎯 Mục tiêu Kỹ thuật

1. **Phân định rõ ràng trách nhiệm State**:
   - **Server State (TanStack Query)**: Quản lý danh sách tồn kho `['inventory', { search, category }]`, tự động làm mới khi bộ lọc thay đổi, điều phối `useMutation` cập nhật số lượng tồn kho.
   - **Client UI State (Zustand)**: Quản lý sản phẩm đang chọn (`selectedItem`), trạng thái đóng/mở Drawer (`isSidebarOpen`), bộ lọc tìm kiếm và hàng đợi thông báo Toast (`toasts`).

2. **Quy trình Điều phối Trạng thái 2 chiều (Cross-State Sync)**:
   - Khi người dùng bấm *"Điều chỉnh"* &rarr; Zustand kích hoạt `openSidebar(item)`.
   - Người dùng thay đổi số lượng và xác nhận &rarr; TanStack Query gửi Mutation lên Backend.
   - Khi mutation thành công (`onSuccess`):
     1. Zustand gọi `closeSidebar()` để đóng Drawer mượt mà.
     2. TanStack Query gọi `queryClient.invalidateQueries({ queryKey: ['inventory'] })` để làm mới dữ liệu toàn hệ thống.
     3. Kích hoạt Toast notification thông báo thành công.

3. **Bẫy Dữ liệu & Phòng Vệ Lỗi (Data Traps & Validation)**:
   - Chặn số lượng âm ($< 0$) ngay tại client và ném lỗi nghiệp vụ tại tầng API.
   - Chặn vượt định mức tồn kho tối đa ($> 10,000$ cái).
   - Hỗ trợ nút mô phỏng lỗi Server 500 để kiểm tra xử lý ngoại lệ và hiển thị Toast lỗi mà không làm sập ứng dụng.

---

## 🏗️ Cấu trúc Thư mục

```text
P3.10/
├── src/
│   ├── api/
│   │   └── inventoryApi.ts            # Mock API tồn kho với đầy đủ bẫy lỗi & validation
│   ├── components/
│   │   ├── DataFlowDiagramModal.tsx   # Modal sơ đồ điều phối trạng thái 2 chiều
│   │   ├── EditInventorySidebar.tsx   # Drawer điều chỉnh tồn kho (Zustand + useMutation)
│   │   ├── Header.tsx                 # Thanh điều hướng và các nút hành động
│   │   ├── InventoryFilterBar.tsx     # Bộ lọc tìm kiếm và danh mục (Zustand state)
│   │   ├── InventoryStatsCards.tsx    # Các thẻ chỉ số KPI tổng quan kho hàng
│   │   ├── InventoryTable.tsx         # Bảng hiển thị tồn kho (TanStack useQuery)
│   │   └── ToastContainer.tsx         # Hàng đợi thông báo hệ thống
│   ├── store/
│   │   └── useInventoryStore.ts       # Zustand Store quản lý toàn bộ Client UI State
│   ├── types/
│   │   └── inventory.ts               # Interface & Type definitions
│   ├── App.tsx                        # Layout và điều phối tổng thể
│   ├── index.css                      # Tailwind CSS
│   └── main.tsx                       # Cấu hình QueryClientProvider
├── package.json
└── vite.config.ts
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy ứng dụng

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi động môi trường phát triển (Vite Dev Server)
npm run dev

# 3. Build kiểm tra TypeScript & Bundle production
npm run build
```
