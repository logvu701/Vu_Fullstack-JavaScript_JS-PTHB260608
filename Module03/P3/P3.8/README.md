# P3.8: [Bài 8 - Giỏi] Trải nghiệm Thời gian thực (Optimistic Updates)

Dự án mô phỏng hệ thống **Dispute Resolution Desk** (Xử lý khiếu nại đơn hàng vi phạm) tích hợp kỹ thuật **Optimistic Updates** với **TanStack Query v5**, mang lại trải nghiệm phản hồi tức thì ($t = 0.0s$) kèm cơ chế phòng vệ tự động hoàn tác (**Rollback**) khi máy chủ gặp sự cố (HTTP 500).

---

## 🎯 Mục tiêu Kỹ thuật

1. **Phản hồi tức thì ($t = 0.0s$)**:
   - Sử dụng `onMutate` để cập nhật trạng thái UI từ `Violation` (Vi phạm) sang `Resolved` (Đã xử lý) ngay thời điểm người dùng click chuột.
   - Tránh hiện tượng giật lag, chờ đợi khi máy chủ có độ trễ cao (2000ms).

2. **Cơ chế Rollback an toàn**:
   - Chụp snapshot dữ liệu hiện tại trước khi ghi đè qua `queryClient.getQueryData(['disputes'])`.
   - Khi API phát sinh lỗi (`onError`), hoàn tác cache về trạng thái ban đầu và hiển thị thông báo lỗi (Error Toast).

3. **Đồng bộ dữ liệu Backend (`onSettled`)**:
   - Luôn kích hoạt `queryClient.invalidateQueries({ queryKey: ['disputes'] })` khi mutation kết thúc nhằm đảm bảo tính toàn vẹn 100% giữa client và server.

4. **Tránh Race Condition**:
   - Gọi `await queryClient.cancelQueries({ queryKey: ['disputes'] })` trước khi thay đổi cache để ngăn background fetch ghi đè dữ liệu mới.

---

## 🏗️ Cấu trúc Thư mục

```text
P3.8/
├── src/
│   ├── api/
│   │   └── disputeApi.ts              # Mock API xử lý khiếu nại (độ trễ 2000ms, hỗ trợ lỗi 500)
│   ├── components/
│   │   ├── DisputeTable.tsx           # Bảng danh sách khiếu nại kèm nút Optimistic Action
│   │   ├── Header.tsx                 # Thanh điều hướng, chuyển đổi chế độ Optimistic/Pessimistic & Lỗi 500
│   │   ├── OptimisticDocModal.tsx     # Modal tài liệu phân tích kỹ thuật onMutate, onError, onSettled
│   │   └── OptimisticTimelineWidget.tsx # Widget log chi tiết từng mili-giây và quá trình Rollback
│   ├── types/
│   │   └── dispute.ts                 # Type definitions (DisputeOrder, DisputeLog, DisputeStatus)
│   ├── App.tsx                        # Root layout và điều phối trạng thái ứng dụng
│   ├── index.css                      # Tailwind CSS styles
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
