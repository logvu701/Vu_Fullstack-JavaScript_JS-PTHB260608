export type CourseCategory = 'all' | 'frontend' | 'backend' | 'fullstack' | 'devops' | 'mobile';

export type CourseLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'popular';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  originalPrice: number;
  rating: number;
  studentsCount: number;
  durationHours: number;
  thumbnail: string;
  tags: string[];
}

export interface FilterState {
  query: string;
  category: CourseCategory;
  level: CourseLevel;
  sort: SortOption;
}
