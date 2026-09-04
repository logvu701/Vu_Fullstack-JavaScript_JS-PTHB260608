export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
  growthPercent: number;
}

export interface RevenueData {
  totalRevenue: number;
  targetAchieved: number;
  annualGrowth: number;
  monthlyStats: MonthlyRevenue[];
  lastUpdated: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  performanceScore: number;
}

export interface StaffData {
  totalEmployees: number;
  activeStaff: StaffMember[];
  lastUpdated: string;
}
