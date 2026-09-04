import React from 'react';
import { Users, Award, Briefcase, RefreshCw } from 'lucide-react';
import type { StaffData } from '../types/dashboard';

interface StaffTabProps {
  data?: StaffData;
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({ data, isLoading, isFetching, onRefresh }) => {
  if (isLoading) {
    return (
      <div className="p-16 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Đang tải Danh sách Nhân sự...</h3>
          <p className="text-xs text-slate-400">Độ trễ API mô phỏng: 1.5s</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Quản lý Đội ngũ Nhân sự ({data?.totalEmployees} thành viên)</h2>
          <p className="text-xs text-slate-400">Chuyển đổi qua lại tab để kiểm chứng tính năng Cache StaleTime</p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isFetching}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          <span>Làm mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.activeStaff.map((staff) => (
          <div key={staff.id} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-white">{staff.name}</h4>
                <p className="text-[11px] text-teal-400">{staff.role}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>Phòng ban: <strong className="text-slate-200">{staff.department}</strong></span>
              <span className="text-emerald-400 font-bold">Điểm KPI: {staff.performanceScore}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
