import React, { memo, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Student } from '../types/student';

interface StudentTableProps {
  students: Student[];
  onSelectStudent?: (student: Student) => void;
}

// Memoized individual Student Row: Chỉ render lại nếu thuộc tính của học viên đó thay đổi
const StudentRow = memo<{ student: Student; onSelect?: (student: Student) => void }>(
  ({ student, onSelect }) => {
    return (
      <tr
        onClick={() => onSelect && onSelect(student)}
        className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors text-xs text-slate-300 cursor-pointer"
      >
        <td className="p-3.5 font-mono font-bold text-cyan-400">{student.code}</td>
        <td className="p-3.5 font-semibold text-white">{student.name}</td>
        <td className="p-3.5 text-slate-400">{student.department}</td>
        <td className="p-3.5 font-mono font-bold text-emerald-400">{student.gpa.toFixed(2)}</td>
        <td className="p-3.5 font-mono">{student.attendancePercent}%</td>
        <td className="p-3.5">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              student.rank === 'Xuất sắc'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : student.rank === 'Giỏi'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {student.rank}
          </span>
        </td>
        <td className="p-3.5 text-center">
          {student.isAudited ? (
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Đạt</span>
            </span>
          ) : (
            <span className="text-slate-500 text-[11px]">Chưa duyệt</span>
          )}
        </td>
      </tr>
    );
  }
);

StudentRow.displayName = 'StudentRow';

export const StudentTable: React.FC<StudentTableProps> = memo(({ students, onSelectStudent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; // Hiển thị 50 học viên mỗi trang để DOM mượt mà

  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  const currentStudents = students.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden space-y-4">
      {/* Table Header Controls */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-medium">
          Hiển thị trang <strong>{currentPage}</strong> / {totalPages} (Tổng số: <strong>{students.length.toLocaleString()}</strong> học viên)
        </span>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-300 px-2">{currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 text-xs font-bold border-b border-slate-800">
              <th className="p-3.5">Mã SV</th>
              <th className="p-3.5">Họ và Tên</th>
              <th className="p-3.5">Khoa Chuyên Ngành</th>
              <th className="p-3.5">Điểm GPA</th>
              <th className="p-3.5">Chuyên Cần</th>
              <th className="p-3.5">Xếp Loại</th>
              <th className="p-3.5 text-center">Kiểm Tra</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-xs text-slate-500">
                  Không tìm thấy học viên nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <StudentRow key={student.id} student={student} onSelect={onSelectStudent} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

StudentTable.displayName = 'StudentTable';
