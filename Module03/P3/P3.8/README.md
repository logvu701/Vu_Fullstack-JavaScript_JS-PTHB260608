# Dự án P3.8: [Bài 8 - Giỏi] Điều phối Trạng thái Phức hợp (useReducer)

## 1. Mục tiêu Dự án
- Gom toàn bộ logic quản lý Giỏ hàng (Cart) phức tạp bao gồm: danh sách khóa học, mã giảm giá, tính toán tạm tính (subtotal), chiết khấu (discountAmount), và tổng thanh toán (finalTotal) vào một `useReducer`.
- Khắc phục triệt để lỗi bất đồng bộ và race condition khi gọi nhiều `useState` rời rạc liên tiếp.
- Triển khai pure function Reducer và ma trận Discriminated Union cho các Actions.
- **Xử lý bẫy dữ liệu**: Ràng buộc toàn vẹn dữ liệu - Nếu một khóa học đã tồn tại trong giỏ hàng, hành động "ADD_ITEM" bị từ chối an toàn và không làm thay đổi state hiện tại.

## 2. Cấu trúc Thư mục
```
P3.8/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Header và bộ đếm giỏ hàng
│   │   ├── CourseCatalog.tsx       # Danh mục khóa học để thêm vào giỏ
│   │   ├── CartSection.tsx         # Chi tiết giỏ hàng, áp dụng voucher, tính tiền
│   │   ├── ActionHistoryLog.tsx    # Live terminal ghi nhật ký biến đổi reducer
│   │   └── AnalysisModal.tsx       # Báo cáo phân tích useState vs useReducer & Ma trận Union
│   ├── data/
│   │   └── mockData.ts             # Khóa học mẫu & Danh sách mã giảm giá
│   ├── reducer/
│   │   └── cartReducer.ts          # Pure Reducer function & data integrity guard
│   ├── types/
│   │   └── cart.ts                 # TypeScript Discriminated Union Actions & State
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Ma trận Discriminated Union Actions
```typescript
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: { courseId: string } }
  | { type: 'APPLY_COUPON'; payload: { coupon: Coupon } }
  | { type: 'APPLY_COUPON_FAIL'; payload: { errorMessage: string } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'DISMISS_ALERT' };
```

## 4. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.8

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```
