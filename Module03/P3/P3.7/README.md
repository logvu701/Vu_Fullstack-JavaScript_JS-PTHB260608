# Dự án P3.7: [Bài 7 - Giỏi] Trừu tượng hóa Logic trạng thái (Custom Hooks)

## 1. Mục tiêu Dự án
- Thiết kế Custom Hook `useCountdown` tái sử dụng hoàn toàn logic đếm ngược thời gian cho 2 phân hệ:
  1. **Bài kiểm tra trắc nghiệm (Quiz Timer)**: Đếm ngược 60s, cảnh báo khi sắp hết giờ, tự động khóa và nộp bài khi về 0.
  2. **Sự kiện Flash Sale (Flash Sale Countdown)**: Đếm ngược deal giá sốc, tự động kết thúc ưu đãi khi hết giờ.
- **Xử lý bẫy dữ liệu**: Tự động dọn dẹp interval trong hàm cleanup của `useEffect` khi component unmount, ngăn chặn triệt để hiện tượng rò rỉ bộ nhớ (Memory Leak).
- So sánh 2 giải pháp cấu trúc dữ liệu trả về: **Object Return** vs **Tuple Return (`as const`)**.

## 2. Cấu trúc Thư mục
```
P3.7/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Điều hướng các phân hệ
│   │   ├── QuizModule.tsx          # Phân hệ Bài thi trắc nghiệm
│   │   ├── FlashSaleModule.tsx     # Phân hệ Flash Sale đếm ngược
│   │   ├── ComparisonTable.tsx     # Bảng so sánh 2 giải pháp Return Type
│   │   └── UnmountTestModule.tsx   # Sandbox kiểm tra giải phóng bộ nhớ khi unmount
│   ├── hooks/
│   │   ├── useCountdown.ts         # Custom Hook chính (Object Return)
│   │   ├── useCountdownObject.ts   # Giải pháp 1: Object Return
│   │   └── useCountdownTuple.ts    # Giải pháp 2: Tuple Return (as const)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Bảng So sánh 2 Giải pháp Return Type
| Tiêu chí | Giải pháp 1: Object Return | Giải pháp 2: Tuple (`as const`) |
| :--- | :--- | :--- |
| **Cú pháp trả về** | `{ timeLeft, isRunning, start, pause, reset }` | `[timeLeft, { start, pause, reset }] as const` |
| **Tính linh hoạt mở rộng** | Rất cao, dễ bổ sung thuộc tính mới | Thấp, thêm phần tử làm lệch index |
| **An toàn kiểu (Type-Safety)** | Tuyệt đối (tên thuộc tính rõ ràng) | Cần `as const` để giữ kiểu |
| **Trích xuất chọn lọc** | `{ timeLeft }` đơn giản | Buộc phải trích xuất phần tử trước |
| **Quyết định** | **Được chọn làm kiến trúc chính** | Thích hợp cho hook đơn giản như useState |

## 4. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.7

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```
