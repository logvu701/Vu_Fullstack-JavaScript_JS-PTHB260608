import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Video, LayoutDashboard, ArrowRight, Lock, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user, login } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hệ thống Định tuyến Bảo mật Cấp độ Doanh nghiệp</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Phòng Học Trực Tuyến & <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Protected Routes</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Nội dung phòng học ảo và bảng điều khiển quản trị được bảo vệ an toàn. Các truy cập trái phép bằng URL trực tiếp sẽ được tự động chặn và điều hướng có kiểm soát.
        </p>

        {/* Quick auth bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {isAuthenticated ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đang đăng nhập dưới quyền: <strong>{user?.name}</strong> (Vai trò: <span className="uppercase font-bold">{user?.role}</span>)</span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex flex-wrap items-center gap-2 justify-center">
              <span>Thử đăng nhập nhanh bằng 1 click:</span>
              <button
                onClick={() => login('student')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              >
                Học viên (Student)
              </button>
              <button
                onClick={() => login('admin')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition"
              >
                Quản trị viên (Admin)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Virtual Classroom (Protected) */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Phòng Học Ảo Trực Tuyến</h3>
              <span className="p-1 rounded-md bg-purple-950 text-purple-400 text-[10px] font-bold border border-purple-800">
                PROTECTED
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Khu vực livestream tương tác trực tiếp và chia sẻ code độc quyền. Yêu cầu đăng nhập tài khoản học viên để tham gia.
            </p>
          </div>

          <Link
            to="/classroom/react-pro-room"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow"
          >
            <span>Vào Phòng Học</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Student Dashboard (Protected) */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Dashboard Cá Nhân</h3>
              <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 text-[10px] font-bold border border-indigo-800">
                PROTECTED
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Theo dõi tiến độ hoàn thành các module, làm bài tập thực hành và tải chứng chỉ hoàn thành khóa học.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow"
          >
            <span>Xem Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Admin Portal (Role-based Protected) */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Admin Management</h3>
              <span className="p-1 rounded-md bg-rose-950 text-rose-400 text-[10px] font-bold border border-rose-800">
                ADMIN ONLY
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quản lý danh sách lớp học, phân quyền giảng viên và cấu hình hệ thống bảo mật. Chỉ dành cho tài khoản vai trò <code>admin</code>.
            </p>
          </div>

          <Link
            to="/admin"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition flex items-center justify-center gap-2 shadow"
          >
            <span>Truy cập Admin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
