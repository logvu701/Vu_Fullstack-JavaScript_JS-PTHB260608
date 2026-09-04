import type { RevenueData, StaffData } from '../types/dashboard';

/**
 * Mock API Doanh Thu: Có độ trễ 2000ms (2 giây) giả lập gọi Server nước ngoài
 */
export const fetchRevenueStats = async (): Promise<RevenueData> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const now = new Date();
  return {
    totalRevenue: 2850000000 + Math.floor(Math.random() * 50000000),
    targetAchieved: 94.5,
    annualGrowth: 18.2,
    monthlyStats: [
      { month: 'T1', revenue: 210000000, target: 200000000, growthPercent: 5.0 },
      { month: 'T2', revenue: 245000000, target: 220000000, growthPercent: 11.3 },
      { month: 'T3', revenue: 290000000, target: 260000000, growthPercent: 11.5 },
      { month: 'T4', revenue: 310000000, target: 300000000, growthPercent: 3.3 },
      { month: 'T5', revenue: 380000000, target: 350000000, growthPercent: 8.5 },
      { month: 'T6', revenue: 420000000, target: 400000000, growthPercent: 5.0 },
    ],
    lastUpdated: now.toLocaleTimeString(),
  };
};

/**
 * Mock API Nhân Sự: Có độ trễ 1500ms
 */
export const fetchStaffStats = async (): Promise<StaffData> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    totalEmployees: 48,
    activeStaff: [
      {
        id: 'st-1',
        name: 'Hoàng Minh Nam',
        role: 'Tech Lead / Giảng viên React',
        department: 'Engineering',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        performanceScore: 98,
      },
      {
        id: 'st-2',
        name: 'Nguyễn Thảo Linh',
        role: 'Product Manager',
        department: 'Product',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        performanceScore: 95,
      },
      {
        id: 'st-3',
        name: 'Trần Đức Trí',
        role: 'Senior DevOps Architect',
        department: 'Infrastructure',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        performanceScore: 92,
      },
    ],
    lastUpdated: new Date().toLocaleTimeString(),
  };
};
