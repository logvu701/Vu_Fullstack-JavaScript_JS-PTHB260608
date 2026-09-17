# P4.6 - [Bài 6 - Khá] Phân tích Hành vi: PUT vs PATCH

## 1. Mục tiêu & Bối cảnh
- **Mục tiêu**: Nắm vững sự khác biệt căn bản giữa hai phương thức HTTP `PUT` và `PATCH`, hiểu rõ tính Lũy đẳng (Idempotency), kích thước payload và các nguy cơ mất an toàn dữ liệu trong các hệ thống RESTful doanh nghiệp.
- **Bối cảnh**: Tính năng "Cập nhật Hồ sơ nhân sự" gồm 10 trường dữ liệu: `id`, `fullName`, `email`, `phone`, `department`, `position`, `salary`, `avatar`, `status`, `address`.
  - **Nhân viên A**: Chỉ muốn đổi "Số điện thoại".
  - **Nhân viên B**: Muốn ghi đè toàn bộ hồ sơ mới.
- **Yêu cầu triển khai**:
  - Hàm 1: `updateUserWithPut(id, fullPayload)` sử dụng `axios.put`.
  - Hàm 2: `updateUserWithPatch(id, partialPayload)` sử dụng `axios.patch`.
- **Bẫy nghiệp vụ (Business Trap)**:
  - Nếu áp dụng `axios.put` cho Nhân viên A nhưng chỉ gửi payload thiếu trường (`{ phone: "0988776655" }`), máy chủ RESTful tiêu chuẩn (RFC 7231) sẽ thực thi **Full Replacement**, dẫn đến việc xóa sổ vĩnh viễn 9 trường còn lại khỏi Database (Data Loss).
  - Sử dụng `axios.patch` (RFC 5789) là giải pháp an toàn và chuẩn mực vì máy chủ chỉ hợp nhất (Partial Merge) các trường được chỉ định.

---

## 2. Cấu trúc Dự án
```
P4.6/
├── REPORT_PUT_VS_PATCH.md       # Báo cáo phân tích chuyên sâu I/O & Idempotency
├── package.json                 # Cấu hình scripts & dependencies
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── src/
    ├── api/
    │   └── userApi.ts           # 2 hàm updateUserWithPut & updateUserWithPatch
    ├── components/
    │   ├── PayloadInspector.tsx # Trình hiển thị Request/Response JSON và cảnh báo Data Loss
    │   └── ReportModal.tsx      # Modal tài liệu phân tích kỹ thuật
    ├── types/
    │   └── user.ts              # Interface UserProfile (10 trường) & ExecutionLog
    ├── App.tsx                  # Giao diện tương tác trực quan 2 kịch bản nhân viên
    ├── index.css
    └── main.tsx
```

---

## 3. Bảng So Sánh Kỹ Thuật (RFC 7231 vs RFC 5789)

| Thuộc tính | `PUT` (RFC 7231) | `PATCH` (RFC 5789) |
| :--- | :--- | :--- |
| **Nguyên lý** | Thay thế toàn bộ (Full Replacement) | Sửa đổi từng phần (Partial Modification) |
| **Lũy đẳng (Idempotent)** | **CÓ** ($f(f(x)) = f(x)$) | Không bắt buộc |
| **Payload gửi đi** | Toàn bộ 10/10 trường dữ liệu | Chỉ 1 trường thay đổi (`{ phone }`) |
| **Rủi ro gửi thiếu trường** | **MẤT DỮ LIỆU CÁC TRƯỜNG CÒN LẠI** | An toàn tuyệt đối (Không đổi các trường khác) |
| **Băng thông mạng** | Nặng (Full payload) | Rất nhẹ (Delta payload) |

---

## 4. Hướng dẫn Khởi chạy
```bash
cd P4.6
npm install
npm run dev
```
Truy cập `http://localhost:5175` để trải nghiệm trực quan.
