import type { Course, Coupon } from '../types/cart';

export const AVAILABLE_COURSES: Course[] = [
  {
    id: 'course-react',
    title: 'React 19 & TypeScript Masterclass',
    instructor: 'Hoàng Nam',
    price: 1890000,
    originalPrice: 2490000,
    rating: 4.9,
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'course-node',
    title: 'Node.js & Microservices Clean Architecture',
    instructor: 'Quang Huy',
    price: 2190000,
    originalPrice: 2890000,
    rating: 4.85,
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'course-fullstack',
    title: 'Fullstack Next.js 15 & PostgreSQL Enterprise',
    instructor: 'Minh Thư',
    price: 3200000,
    originalPrice: 4200000,
    rating: 4.95,
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'course-devops',
    title: 'DevOps & Docker, Kubernetes on AWS Cloud',
    instructor: 'Tuấn Anh',
    price: 2490000,
    originalPrice: 3100000,
    rating: 4.8,
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
  },
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'RIKKEI20',
    discountType: 'percentage',
    value: 20,
    minOrder: 1000000,
    description: 'Giảm 20% tổng đơn hàng (Tối thiểu 1.000.000đ)',
  },
  {
    code: 'GIAM500K',
    discountType: 'fixed',
    value: 500000,
    minOrder: 2000000,
    description: 'Giảm trực tiếp 500.000đ (Đơn từ 2.000.000đ)',
  },
  {
    code: 'VIP50',
    discountType: 'percentage',
    value: 50,
    minOrder: 3000000,
    description: 'Giảm sốc 50% cho thành viên VIP (Đơn từ 3.000.000đ)',
  },
];
