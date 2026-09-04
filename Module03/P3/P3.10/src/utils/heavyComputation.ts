import type { Student, FilterConfig, AnalyticsSummary } from '../types/student';

// Biến đếm toàn cục theo dõi số lần hàm tính toán nặng thực sự chạy
export let totalHeavyComputationsCount = 0;

export const resetComputationCount = () => {
  totalHeavyComputationsCount = 0;
};

/**
 * Hàm tính toán phức hợp:
 * - Tìm kiếm sâu trên chuỗi tên, mã, email, khoa.
 * - Lọc theo khoa & GPA tối thiểu.
 * - Tính toán ma trận độ lệch chuẩn, phương sai điểm thi cho 5.000 học viên.
 * - Sắp xếp kết quả.
 * - Đo lường thời gian thực thi (Performance Timer).
 */
export const executeHeavyStudentAnalytics = (
  students: Student[],
  filters: FilterConfig
): { filteredStudents: Student[]; analytics: AnalyticsSummary } => {
  const startTime = performance.now();
  totalHeavyComputationsCount += 1;

  const query = filters.searchQuery.toLowerCase().trim();

  // 1. Lọc dữ liệu qua 5.000 phần tử
  const filtered = students.filter((student) => {
    // Lọc theo khoa
    if (filters.selectedDepartment !== 'All' && student.department !== filters.selectedDepartment) {
      return false;
    }

    // Lọc theo GPA tối thiểu
    if (student.gpa < filters.minGPA) {
      return false;
    }

    // Tìm kiếm chuỗi
    if (query) {
      const matchName = student.name.toLowerCase().includes(query);
      const matchCode = student.code.toLowerCase().includes(query);
      const matchEmail = student.email.toLowerCase().includes(query);
      const matchDept = student.department.toLowerCase().includes(query);
      if (!matchName && !matchCode && !matchEmail && !matchDept) {
        return false;
      }
    }

    // Phép tính ma trận giả lập độ phức tạp tính toán O(N * M)
    let sumSquares = 0;
    for (let k = 0; k < student.scoreMatrix.length; k++) {
      sumSquares += Math.pow(student.scoreMatrix[k] - 75, 2);
    }
    return sumSquares >= 0;
  });

  // 2. Sắp xếp kết quả
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'gpa-desc':
        return b.gpa - a.gpa;
      case 'gpa-asc':
        return a.gpa - b.gpa;
      case 'attendance-desc':
        return b.attendancePercent - a.attendancePercent;
      case 'name-asc':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // 3. Tính toán thống kê tổng quan
  let totalGpa = 0;
  let maxGpa = 0;
  let topRank = 0;

  for (let i = 0; i < filtered.length; i++) {
    totalGpa += filtered[i].gpa;
    if (filtered[i].gpa > maxGpa) maxGpa = filtered[i].gpa;
    if (filtered[i].rank === 'Xuất sắc') topRank++;
  }

  const endTime = performance.now();
  const executionTimeMs = Number((endTime - startTime).toFixed(2));

  const analytics: AnalyticsSummary = {
    totalCount: filtered.length,
    averageGPA: filtered.length > 0 ? Number((totalGpa / filtered.length).toFixed(2)) : 0,
    highestGPA: maxGpa,
    topRankCount: topRank,
    executionTimeMs,
    computationTimestamp: new Date().toLocaleTimeString(),
  };

  return { filteredStudents: filtered, analytics };
};
