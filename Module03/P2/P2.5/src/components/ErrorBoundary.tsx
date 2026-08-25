import { Component } from 'react';
import type { ErrorInfo, ReactNode, CSSProperties } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div style={errorContainerStyle}>
          <div style={errorCardStyle}>
            <div style={iconStyle}>⚠️</div>
            <h2 style={titleStyle}>Hệ thống phát hiện lỗi (Context Exception)</h2>
            <p style={descStyle}>
              Một component cố gắng truy xuất dữ liệu ThemeContext từ ngoài vùng bao phủ của ThemeProvider.
            </p>
            <div style={preStyle}>
              {this.state.error?.message || 'Unknown Exception'}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              style={btnStyle}
            >
              Tải lại ứng dụng
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const errorContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#0f172a',
  color: '#f8fafc',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  padding: '1.5rem',
  boxSizing: 'border-box'
};

const errorCardStyle: CSSProperties = {
  maxWidth: '560px',
  width: '100%',
  backgroundColor: '#1e293b',
  borderRadius: '16px',
  border: '1px solid #ef4444',
  padding: '2.5rem',
  textAlign: 'center',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
};

const iconStyle: CSSProperties = {
  fontSize: '3.5rem',
  marginBottom: '1rem'
};

const titleStyle: CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#f87171',
  marginBottom: '1rem',
  letterSpacing: '-0.025em'
};

const descStyle: CSSProperties = {
  color: '#94a3b8',
  lineHeight: '1.6',
  marginBottom: '1.5rem'
};

const preStyle: CSSProperties = {
  textAlign: 'left',
  backgroundColor: '#0f172a',
  color: '#f43f5e',
  padding: '1.25rem',
  borderRadius: '8px',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  overflowX: 'auto',
  marginBottom: '1.5rem',
  border: '1px solid #334155'
};

const btnStyle: CSSProperties = {
  backgroundColor: '#ef4444',
  color: 'white',
  fontWeight: '600',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  fontSize: '0.95rem'
};
