# Dự án P3.6: [Bài 6 - Khá] Quản lý Trạng thái thông qua URL (useSearchParams)

## 1. Mục tiêu Dự án
- Đồng bộ hóa dữ liệu bộ lọc (Search Query `q`, Danh mục `category`, Cấp độ `level`, Sắp xếp `sort`) với thanh địa chỉ trình duyệt thông qua hook `useSearchParams` từ `react-router-dom`.
- Hỗ trợ chia sẻ kết quả tìm kiếm qua URL (Deep Linking).
- Tự động khôi phục dữ liệu bộ lọc khi người dùng tải lại trang hoặc truy cập liên kết.
- **Xử lý bẫy dữ liệu**: Khi xóa rỗng ô tìm kiếm hoặc reset bộ lọc, tham số rác phải được loại bỏ hoàn toàn (`searchParams.delete('q')`), không để lại `?q=` hoặc `?q=undefined`.

## 2. Cấu trúc Thư mục
```
P3.6/
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Header có các nút mở sơ đồ, chia sẻ, tài liệu
│   │   ├── SearchFilterBar.tsx        # Thanh tìm kiếm & lọc đồng bộ 2 chiều với URL
│   │   ├── CourseList.tsx             # Danh sách khóa học và hiển thị rỗng
│   │   ├── EventFlowVisualizer.tsx    # Sơ đồ biểu diễn luồng sự kiện & đồng bộ URL
│   │   ├── ShareModal.tsx             # Hộp thoại sao chép link chia sẻ
│   │   └── DocModal.tsx               # Báo cáo kỹ thuật chi tiết
│   ├── data/
│   │   └── mockCourses.ts             # Dữ liệu mẫu khóa học phong phú
│   ├── pages/
│   │   └── CoursesPage.tsx            # Trang chính điều phối dữ liệu từ URL
│   ├── types/
│   │   └── course.ts                  # Khai báo TypeScript types
│   ├── App.tsx                        # Thiết lập BrowserRouter và Route
│   ├── index.css                      # Tailwind CSS
│   └── main.tsx                       # Entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.6

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```

## 4. Báo cáo Luồng Bắt sự kiện & Xử lý Bẫy Dữ liệu
1. **User gõ từ khóa**: Bắt sự kiện `onChange` ➔ Cập nhật local state `searchTerm` ➔ Cập nhật `searchParams.set('q', val)`.
2. **User xóa sạch từ khóa**: `nextParams.delete('q')` ➔ Thanh địa chỉ sạch hoàn toàn, không có chuỗi truy vấn rác.
3. **Người dùng tải lại trang (Reload / Deep link)**: Component đọc `searchParams.get('q')` để khởi tạo state và lọc danh sách.
