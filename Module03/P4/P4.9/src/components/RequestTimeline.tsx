import React from "react";
import { SearchRequestEvent } from "../types/search";
import { Clock, Ban, CheckCircle, Flame, ShieldCheck } from "lucide-react";

interface RequestTimelineProps {
  events: SearchRequestEvent[];
}

export const RequestTimeline: React.FC<RequestTimelineProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans text-xs">
      <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <h4 className="font-bold text-slate-800">
            Dòng Thời Gian Yêu Cầu Mạng (Live Request Timeline)
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          {events.length} yêu cầu được kích hoạt
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-100">
            <tr>
              <th className="p-3 pl-6">Req ID</th>
              <th className="p-3">Từ khóa (Query)</th>
              <th className="p-3">Độ trễ giả lập</th>
              <th className="p-3">Thời gian phản hồi</th>
              <th className="p-3">Trạng thái Tín hiệu (Signal Status)</th>
              <th className="p-3 text-right pr-6">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-slate-400">
                  Chưa có yêu cầu nào. Hãy gõ từ khóa vào ô tìm kiếm bên trên!
                </td>
              </tr>
            ) : (
              events.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 pl-6 font-mono font-bold text-slate-700">
                    {ev.id}
                  </td>
                  <td className="p-3">
                    <span className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold">
                      "{ev.query}"
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-500">
                    {ev.simulatedDelay}ms
                  </td>
                  <td className="p-3 font-mono text-slate-600">
                    {ev.durationMs ? `${ev.durationMs}ms` : "Đang xử lý..."}
                  </td>
                  <td className="p-3">
                    {ev.status === "ABORTED" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full font-bold text-[11px]">
                        <Ban className="w-3 h-3 text-rose-600" />
                        ABORTED (Bị hủy bởi AbortController)
                      </span>
                    ) : ev.status === "RESOLVED" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        RESOLVED (Thành công hiển thị)
                      </span>
                    ) : ev.status === "OVERWRITTEN_BY_RACE_CONDITION" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[11px]">
                        <Flame className="w-3 h-3 text-amber-600" />
                        RACE CONDITION (Kết quả cũ ghi đè)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium text-[11px]">
                        PENDING (Đang bay qua mạng...)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right pr-6 font-mono font-medium text-slate-700">
                    {ev.resultCount !== undefined ? `${ev.resultCount} sản phẩm` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
