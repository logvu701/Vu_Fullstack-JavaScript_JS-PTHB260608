import type { Student, Department, Rank } from '../types/student';

const DEPARTMENTS: Department[] = [
  'Frontend Engineering',
  'Backend Microservices',
  'Cloud DevOps',
  'Mobile React Native',
  'Data AI',
];

const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương'];
const MIDDLE_NAMES = ['Văn', 'Thị', 'Đức', 'Minh', 'Hồng', 'Thành', 'Quang', 'Bảo', 'Gia', 'Tuấn', 'Hải', 'Xuân', 'Kim', 'Ngọc'];
const FIRST_NAMES = ['Anh', 'Bình', 'Cường', 'Dũng', 'Em', 'Giang', 'Hà', 'Hùng', 'Khoa', 'Linh', 'Long', 'Mai', 'Nam', 'Phong', 'Quân', 'Sơn', 'Thảo', 'Trang', 'Tuấn', 'Uyên', 'Việt', 'Yến'];

/**
 * Tạo danh sách 5.000 học viên xác định (Deterministic dataset)
 */
export const generate5000Students = (): Student[] => {
  const students: Student[] = [];

  for (let i = 1; i <= 5000; i++) {
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const middleName = MIDDLE_NAMES[(i * 3) % MIDDLE_NAMES.length];
    const firstName = FIRST_NAMES[(i * 7) % FIRST_NAMES.length];
    const fullName = `${lastName} ${middleName} ${firstName} #${i}`;

    const department = DEPARTMENTS[i % DEPARTMENTS.length];
    const code = `RK-${String(i).padStart(5, '0')}`;
    const email = `student.${i}@rikkei.edu.vn`;

    // GPA từ 2.0 đến 4.0
    const rawGpa = 2.0 + ((i * 17) % 200) / 100;
    const gpa = Number(Math.min(4.0, Math.max(2.0, rawGpa)).toFixed(2));

    // Chuyên cần 70% - 100%
    const attendancePercent = 70 + ((i * 13) % 31);

    // Xếp loại
    let rank: Rank = 'Trung bình';
    if (gpa >= 3.6) rank = 'Xuất sắc';
    else if (gpa >= 3.2) rank = 'Giỏi';
    else if (gpa >= 2.5) rank = 'Khá';

    // Ma trận điểm 5 môn chuyên ngành để phục vụ tính toán nặng
    const scoreMatrix = [
      60 + ((i * 5) % 41),
      65 + ((i * 9) % 36),
      70 + ((i * 11) % 31),
      75 + ((i * 13) % 26),
      80 + ((i * 17) % 21),
    ];

    students.push({
      id: `std-${i}`,
      name: fullName,
      code,
      email,
      department,
      gpa,
      attendancePercent,
      rank,
      isAudited: i % 4 === 0,
      scoreMatrix,
    });
  }

  return students;
};
