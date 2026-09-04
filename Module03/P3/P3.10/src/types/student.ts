export type Department = 'All' | 'Frontend Engineering' | 'Backend Microservices' | 'Cloud DevOps' | 'Mobile React Native' | 'Data AI';

export type Rank = 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình';

export interface Student {
  id: string;
  name: string;
  code: string;
  email: string;
  department: Department;
  gpa: number;
  attendancePercent: number;
  rank: Rank;
  isAudited: boolean;
  scoreMatrix: number[];
}

export interface FilterConfig {
  searchQuery: string;
  selectedDepartment: Department;
  minGPA: number;
  sortBy: 'gpa-desc' | 'gpa-asc' | 'attendance-desc' | 'name-asc';
}

export interface AnalyticsSummary {
  totalCount: number;
  averageGPA: number;
  highestGPA: number;
  topRankCount: number;
  executionTimeMs: number;
  computationTimestamp: string;
}
