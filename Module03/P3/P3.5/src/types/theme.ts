export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  lessonsCount: number;
  duration: string;
  rating: number;
  students: number;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  image: string;
}

export interface UserStats {
  completedCourses: number;
  hoursLearned: number;
  streakDays: number;
  achievementsCount: number;
}
