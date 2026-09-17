import React from "react";
import { ClientExecutionLog } from "../api/client/types";
import { Terminal, CheckCircle, AlertTriangle } from "lucide-react";

interface ExecutionLogTableProps {
  logs: ClientExecutionLog[];
}

export const ExecutionLogTable: React.FC<ExecutionLogTableProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden font-sans text-xs">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <h4 className="font-bold text-slate-800">
            Nhật Ký Gọi Hàm Resilient Client (Client Execution Audit)
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {logs.length} thao tác
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-100">
            <tr>
              <th className="p-3.5 pl-6">ID</th>
              <th className="p-3.5">Method & URL</th>
              <th className="p-3.5">Kịch bản / Nghiệp vụ</th>
              <th className="p-3.5">Trạng thái (Status)</th>
              <th className="p-3.5 text-right pr-6">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-400">
                  Chưa có thao tác nào. Hãy thực thi hàm get, post, put, remove ở trên!
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 pl-6 font-mono font-bold text-slate-600">
                    {log.id}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          log.method === "GET"
                            ? "bg-blue-100 text-blue-700"
                            : log.method === "POST"
                            ? "bg-emerald-100 text-emerald-700"
                            : log.method === "PUT"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {log.method}
                      </span>
                      <span className="font-mono text-slate-800">{log.url}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600 font-medium">
                    {log.scenario}
                  </td>
                  <td className="p-3.5">
                    {log.status === 200 || log.status === 201 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        HTTP {log.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        {log.status}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right pr-6 font-mono text-slate-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString()}
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
