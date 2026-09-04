import React from 'react';
import { 
  BookOpen, Clock, Users, Star, Award, TrendingUp, Zap, 
  Layers, CheckCircle2, Code2, Sparkles, Compass 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Course } from '../types/theme';

const MOCK_COURSES: Course[] = [
  {
    id: 'c-1',
    title: 'Lập trình Fullstack JavaScript Chuyên sâu',
    description: 'Làm chủ React 19, TypeScript, Node.js, Express, Microservices và tối ưu hoá hiệu năng ứng dụng quy mô lớn.',
    category: 'Fullstack Development',
    lessonsCount: 64,
    duration: '120 giờ',
    rating: 4.9,
    students: 1250,
    level: 'Nâng cao',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'c-2',
    title: 'React Design Patterns & Clean Architecture',
    description: 'Thấu hiểu Context API, Custom Hooks, HOC, Render Props, State Reducer và giải quyết triệt để Prop Drilling.',
    category: 'Frontend Engineering',
    lessonsCount: 42,
    duration: '80 giờ',
    rating: 4.85,
    students: 980,
    level: 'Trung cấp',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'c-3',
    title: 'TypeScript for Enterprise React Applications',
    description: 'Xây dựng Type-Safe Application, Discriminated Unions, Generics và Strict Type Checking trong production.',
    category: 'TypeScript',
    lessonsCount: 38,
    duration: '65 giờ',
    rating: 4.95,
    students: 1540,
    level: 'Nâng cao',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
  },
];

export const MainContent: React.FC = () => {
  // MainContent tiêu thụ trực tiếp useTheme() mà không thông qua bất kỳ prop nào từ Header hay App
  const { theme, setTheme } = useTheme();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner with Theme indicator */}
      <section className={`p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/40 border-slate-700/60 shadow-black/40'
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-emerald-100 shadow-emerald-500/5'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nền tảng Học tập Rikkei Academy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Nâng tầm Kỹ năng với <span className="text-emerald-500">Giao diện Ban đêm</span> chuẩn Context API
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Hệ thống áp dụng kiến trúc <strong>React Context API</strong> độc lập để phân phối trạng thái giao diện (Theme) trực tiếp từ Root xuống các Component con (Header, MainContent, Footer) mà không gặp vấn đề <em>Prop Drilling</em>.
          </p>

          {/* Direct Subscription Status Card */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Theme hiện tại: <strong className="uppercase text-emerald-500">{theme}</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                  theme === 'light'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Ép chọn Sáng (Light)
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Ép chọn Tối (Dark)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Metrics Dashboard */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: BookOpen, title: 'Khóa học đang học', value: '4 / 12', color: 'text-blue-500 bg-blue-500/10' },
          { icon: Clock, title: 'Thời lượng tích lũy', value: '86 Giờ', color: 'text-emerald-500 bg-emerald-500/10' },
          { icon: TrendingUp, title: 'Chuỗi ngày liên tục', value: '14 Ngày 🔥', color: 'text-amber-500 bg-amber-500/10' },
          { icon: Award, title: 'Chứng chỉ hoàn thành', value: '3 Đã cấp', color: 'text-purple-500 bg-purple-500/10' },
        ].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.title}</span>
                <div className={`p-2.5 rounded-xl ${item.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
            </div>
          );
        })}
      </section>

      {/* Course List Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              Danh sách Khóa học Nổi bật
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Áp dụng theme reactive tự động trong từng Card khóa học
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            {MOCK_COURSES.length} Khóa học
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map((course) => (
            <div
              key={course.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-slate-800/70 border-slate-700/80 hover:border-emerald-500/50 hover:shadow-black/50'
                  : 'bg-white border-slate-200/90 hover:border-emerald-500/40 hover:shadow-emerald-500/10'
              }`}
            >
              {/* Course Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  {course.category}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                  {course.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Meta Info */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>{course.students} học viên</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Bắt đầu Học ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture Callout */}
      <section className={`p-6 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-slate-900/60 border-slate-800 text-slate-300'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Lợi thế kỹ thuật: Loại bỏ Prop Drilling với React Context
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 space-y-1">
                <span className="font-semibold text-rose-500">🚫 Trước đây (Prop Drilling):</span>
                <p>App ➔ Header ➔ Navigation ➔ ThemeToggle. Mỗi cấp trung gian đều phải khai báo và truyền props <code>theme</code>, <code>setTheme</code> dù không trực tiếp sử dụng.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 space-y-1">
                <span className="font-semibold text-emerald-500">✅ Hiện tại (Context API + useTheme):</span>
                <p>Bất kỳ component nào cần dữ liệu Theme chỉ cần gọi <code>const &#123; theme, toggleTheme &#125; = useTheme()</code>. Cây component trở nên độc lập, dễ bảo trì và mở rộng.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
