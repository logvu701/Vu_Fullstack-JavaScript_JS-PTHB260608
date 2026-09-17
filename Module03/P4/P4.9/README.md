# P4.9 - [Bài 9 - Xuất sắc] Tối Ưu Hiệu Suất với Kỹ Thuật Hủy Request (Cancellation)

## 1. Mục tiêu & Bối cảnh
- **Mục tiêu**: Quản lý tài nguyên mạng chủ động và triệt tiêu hoàn toàn lỗi **Race Condition** trong các tương tác bất đồng bộ (Live Search) bằng cách kết hợp Web API `AbortController` với Axios.
- **Bối cảnh**: Chức năng "Tìm kiếm Live" liên tục gửi API truy vấn mỗi khi người dùng gõ phím. Nếu gõ quá nhanh, các request cũ đi đường vòng có thể phản hồi muộn hơn request mới, dẫn đến việc giao diện hiển thị kết quả sai lệch (kết quả của từ khóa cũ đè lên từ khóa mới).
- **Yêu cầu triển khai**:
  - Khi người dùng gõ ký tự mới, chủ động gọi `controller.abort()` để hủy bỏ yêu cầu API đang bay trước đó, sau đó mới gửi yêu cầu mới kèm `signal: controller.signal`.
- **Bẫy dữ liệu (Data Trap)**:
  - Quá trình hủy request sẽ ném một ngoại lệ vào khối `catch` (`CanceledError`).
  - Phải sử dụng hàm chuẩn `axios.isCancel(err)` để phân biệt đây là hành vi chủ động hủy hợp lệ của hệ thống chứ không phải sự cố mất kết nối mạng thông thường, tránh việc in ra `console.error` rác và hiển thị thông báo lỗi sai lệch cho người dùng.

---

## 2. Cấu trúc Thư mục Dự án
```
P4.9/
├── SEQUENCE_DIAGRAM.md          # Sơ đồ tuần tự mô tả quá trình hủy request và ngăn Race Condition
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── src/
    ├── api/
    │   └── searchApi.ts         # Mock Search API hỗ trợ AbortSignal và axios.isCancel
    ├── components/
    │   ├── RequestTimeline.tsx  # Dòng thời gian hiển thị trạng thái từng Request (ABORTED/RESOLVED)
    │   └── SequenceDiagramModal.tsx # Modal biểu diễn trực quan luồng dữ liệu tuần tự
    ├── types/
    │   └── search.ts            # Type definitions (Product, SearchRequestEvent)
    ├── App.tsx                  # Giao diện Live Search có thanh điều chỉnh độ trễ mạng
    ├── index.css
    └── main.tsx
```

---

## 3. Mã Nguồn Cốt Lõi: AbortController & isCancel

```typescript
const abortControllerRef = useRef<AbortController | null>(null);

const handleSearch = async (query: string) => {
  // 1. Hủy bỏ request đang bay trước đó
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  // 2. Tạo controller mới
  const newController = new AbortController();
  abortControllerRef.current = newController;

  try {
    const data = await axios.get('/search', {
      params: { q: query },
      signal: newController.signal,
    });
    setResults(data);
  } catch (err) {
    // 3. Xử lý bẫy dữ liệu:
    if (axios.isCancel(err)) {
      // Hủy chủ động an toàn, không đổi UI và không in lỗi console
      return;
    }
    console.error("Lỗi mạng thực sự:", err);
  }
};
```

---

## 4. Hướng dẫn Khởi chạy
```bash
cd P4.9
npm install
npm run dev
```
Truy cập `http://localhost:5178`.
