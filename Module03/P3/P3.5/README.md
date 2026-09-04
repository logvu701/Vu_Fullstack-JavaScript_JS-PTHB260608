# Dự án P3.5: [Bài 5 - Khá] Quản lý Trạng thái Toàn cục (Context API)

## 1. Mục tiêu Dự án
- Khắc phục triệt để vấn đề **Prop Drilling** bằng `useContext` và `Context API`.
- Tạo `ThemeContext` độc lập để quản lý trạng thái Giao diện Sáng / Ban đêm (`'light' | 'dark'`).
- Cho phép `Header` (nơi toggle), `MainContent` (hiển thị khóa học), và `Footer` (chân trang) đăng ký (subscribe) trực tiếp vào luồng dữ liệu mà không cần truyền props tuần tự.
- **Xử lý bẫy dữ liệu**: Định nghĩa rõ ràng Type cho Context, xử lý ngoại lệ an toàn khi gọi `useTheme` ngoài `ThemeProvider`.

## 2. Cấu trúc Thư mục
```
P3.5/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Nút toggle Theme, menu
│   │   ├── MainContent.tsx         # Dashboard học tập, danh sách khóa học (subscribe useTheme)
│   │   ├── Footer.tsx              # Chân trang (subscribe useTheme)
│   │   ├── ErrorBoundary.tsx       # Bắt ngoại lệ khi gọi ngoài Provider
│   │   ├── DemoOutsideProvider.tsx # Demo tương tác kiểm tra ngoại lệ bẫy dữ liệu
│   │   └── DocModal.tsx            # Báo cáo kiến trúc kỹ thuật
│   ├── context/
│   │   └── ThemeContext.tsx        # Khởi tạo Context, Provider & Custom Hook useTheme
│   ├── types/
│   │   └── theme.ts                # Khai báo TypeScript types
│   ├── App.tsx                     # Bọc ứng dụng trong ThemeProvider
│   ├── index.css                   # Tailwind CSS styling & animations
│   └── main.tsx                    # React Root render
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Cách Cài đặt và Khởi chạy
```bash
# 1. Di chuyển vào thư mục dự án
cd P3.5

# 2. Cài đặt các phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển
npm run dev

# 4. Build kiểm tra TypeScript
npm run build
```

## 4. Báo cáo Xử lý Bẫy Dữ liệu (Defensive Programming)
- Khi gọi `useTheme()` ngoài `ThemeProvider`, `useContext(ThemeContext)` sẽ trả về `undefined`.
- Hook kiểm tra `if (context === undefined)` và chủ động ném ra `new Error("useTheme must be used within a <ThemeProvider>...")` thay vì để xảy ra lỗi runtime `TypeError: Cannot read properties of undefined`.
