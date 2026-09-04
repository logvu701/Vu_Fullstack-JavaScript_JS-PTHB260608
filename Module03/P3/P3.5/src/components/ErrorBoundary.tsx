import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary để bắt các ngoại lệ runtime, đặc biệt là khi component gọi Hook ngoài Provider.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 my-4 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 rounded-2xl shadow-lg transition-all animate-in fade-in duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/60 rounded-xl text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">
                {this.props.fallbackTitle || 'Đã bắt được Ngoại lệ Context API (Defensive Catch)'}
              </h3>
              <p className="mt-1 text-sm text-rose-700 dark:text-rose-300 font-mono bg-rose-100/70 dark:bg-rose-900/40 p-3 rounded-lg border border-rose-200 dark:border-rose-800 break-words">
                {this.state.error?.message || 'Lỗi không xác định'}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Thử lại / Đóng ngoại lệ
                </button>
                <span className="text-xs text-rose-600 dark:text-rose-400">
                  (Bẫy dữ liệu đã hoạt động thành công: Thay vì ném lỗi undefined/null crash cả app, hệ thống đã ném Error tường minh!)
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
