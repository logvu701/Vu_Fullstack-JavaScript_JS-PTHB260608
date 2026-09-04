import React, { useState } from 'react';
import { executeMockApiCall } from '../api/axiosClient';
import type { RequestInspectorLog } from '../types/store';
import { Send, Terminal, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Trash2, ArrowRight } from 'lucide-react';

export const ApiRequesterInspector: React.FC = () => {
  const [logs, setLogs] = useState<RequestInspectorLog[]>([]);
  const [loadingEndpoint, setLoadingEndpoint] = useState<string | null>(null);

  const handleSendRequest = async (endpoint: string) => {
    setLoadingEndpoint(endpoint);
    try {
      const res = await executeMockApiCall(endpoint, 'GET');
      const newLog: RequestInspectorLog = {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString() + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
        ...res,
      };
      setLogs((prev) => [newLog, ...prev]);
    } finally {
      setLoadingEndpoint(null);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Axios Interceptor & Request Inspector</h2>
            <p className="text-xs text-slate-400">
              Kiểm tra Request Headers được đính kèm tự động từ <code>useBoundStore.getState()</code>
            </p>
          </div>
        </div>

        {logs.length > 0 && (
          <button
            onClick={() => setLogs([])}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa Inspector Logs</span>
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleSendRequest('/api/admin/metrics')}
          disabled={loadingEndpoint !== null}
          className="p-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/80 text-left transition flex flex-col justify-between gap-3 group disabled:opacity-50"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-purple-300">GET /api/admin/metrics</span>
              <span className="text-[10px] bg-purple-900 text-purple-200 px-1.5 py-0.5 rounded font-bold">Admin Only</span>
            </div>
            <p className="text-[11px] text-slate-400">Yêu cầu Token & Role Admin (401 nếu chưa login, 403 nếu sai role)</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-purple-300">
            <span>{loadingEndpoint === '/api/admin/metrics' ? 'Đang gửi...' : 'Gửi Request'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => handleSendRequest('/api/manager/reports')}
          disabled={loadingEndpoint !== null}
          className="p-3.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/80 text-left transition flex flex-col justify-between gap-3 group disabled:opacity-50"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-indigo-300">GET /api/manager/reports</span>
              <span className="text-[10px] bg-indigo-900 text-indigo-200 px-1.5 py-0.5 rounded font-bold">Auth Required</span>
            </div>
            <p className="text-[11px] text-slate-400">Yêu cầu Token xác thực bất kỳ (401 nếu chưa đăng nhập)</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
            <span>{loadingEndpoint === '/api/manager/reports' ? 'Đang gửi...' : 'Gửi Request'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => handleSendRequest('/api/public/news')}
          disabled={loadingEndpoint !== null}
          className="p-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/80 text-left transition flex flex-col justify-between gap-3 group disabled:opacity-50"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-emerald-300">GET /api/public/news</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded font-bold">Public</span>
            </div>
            <p className="text-[11px] text-slate-400">Không yêu cầu Token. Interceptor không gắn Header Authorization rác</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
            <span>{loadingEndpoint === '/api/public/news' ? 'Đang gửi...' : 'Gửi Request'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Inspector Logs */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Request / Response Inspector Log ({logs.length})
        </h3>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">
            Bấm vào 1 trong các nút phía trên để kiểm tra headers gửi đi và phản hồi từ Server.
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {logs.map((log) => {
              const is200 = log.status === 200;
              const is401 = log.status === 401;
              const is403 = log.status === 403;

              return (
                <div
                  key={log.id}
                  className={`p-4 rounded-xl border space-y-3 ${
                    is200
                      ? 'bg-slate-950/80 border-emerald-800/60'
                      : is401
                      ? 'bg-slate-950/80 border-rose-800/60'
                      : 'bg-slate-950/80 border-amber-800/60'
                  }`}
                >
                  {/* Top line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono font-bold text-slate-300">
                        {log.method}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-100">
                        {log.endpoint}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                          is200
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : is401
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}
                      >
                        {log.status} {log.statusText}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                    </div>
                  </div>

                  {/* Headers Inspector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Sent Request Headers */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800 pb-1">
                        <span>REQUEST HEADERS</span>
                        <span
                          className={`text-[10px] px-1 rounded ${
                            log.authHeaderAttached ? 'bg-purple-950 text-purple-300' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {log.authHeaderAttached ? 'Bearer Attached' : 'No Auth Header'}
                        </span>
                      </div>
                      <div className="text-[11px] space-y-1">
                        {Object.entries(log.headersSent).map(([k, v]) => (
                          <div key={k} className="flex items-start gap-2">
                            <span className="text-slate-400">{k}:</span>
                            <span className={k === 'Authorization' ? 'text-purple-300 font-bold break-all' : 'text-slate-300'}>
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Payload */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono">
                      <div className="text-[11px] text-slate-400 font-bold border-b border-slate-800 pb-1">
                        RESPONSE BODY
                      </div>
                      <pre className="text-[11px] text-slate-300 overflow-x-auto max-h-28">
                        {JSON.stringify(log.responseBody, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Explanation Banner */}
                  <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    {log.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
