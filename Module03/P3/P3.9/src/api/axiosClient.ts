import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { useBoundStore } from '../store/useBoundStore';

// Khởi tạo instance Axios
export const axiosClient = axios.create({
  baseURL: 'https://api.system.enterprise.local/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'React-Vite-Enterprise-App',
  },
});

/**
 * REQUEST INTERCEPTOR (Vanilla JS context - Ngoài React Component):
 * Đọc trực tiếp Zustand State qua useBoundStore.getState().token.
 * 
 * BẪY DỮ LIỆU:
 * - Khi user đã login (token != null): Đính kèm `Authorization: Bearer <token>`
 * - Khi user logout (token == null): Tuyệt đối KHÔNG đính kèm header Authorization hoặc để Bearer null!
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Đọc token từ Zustand Store ngoài React
    const token = useBoundStore.getState().token;

    // 2. Kiểm tra chặt chẽ và đính kèm Authorization header
    if (token && token.trim() !== '') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // Xóa bỏ header Authorization nếu không có token hợp lệ
      config.headers.delete('Authorization');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR (Vanilla JS context):
 * Tự động bắt lỗi 401 Unauthorized và phát toast thông báo qua useBoundStore.getState().addToast()
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      useBoundStore.getState().addToast({
        type: 'error',
        message: '⚠️ [401 Unauthorized]: Bạn cần đăng nhập để truy cập tài nguyên bảo mật này!',
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Mock Request Handler để giả lập mạng thật ngay trong trình duyệt:
 * Kiểm tra xem Header Authorization đã được Interceptor đính kèm chuẩn hay chưa.
 */
export const executeMockApiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET'
) => {
  // Giả lập độ trễ mạng 500ms
  await new Promise((r) => setTimeout(r, 500));

  // Lấy config bằng cách cho đi qua request interceptor logic
  const token = useBoundStore.getState().token;
  const user = useBoundStore.getState().user;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'React-Vite-Enterprise-App',
  };

  if (token && token.trim() !== '') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Phân tích endpoint
  if (endpoint.startsWith('/api/admin/metrics') || endpoint.startsWith('/api/manager/reports')) {
    // Endpoint bảo mật
    if (!token) {
      useBoundStore.getState().addToast({
        type: 'error',
        message: '⛔ 401 Unauthorized: Yêu cầu Header Authorization hợp lệ!',
      });
      return {
        endpoint,
        method,
        headersSent: headers,
        authHeaderAttached: false,
        authHeaderValue: null,
        status: 401,
        statusText: 'Unauthorized',
        responseBody: {
          error: 'Unauthorized Access',
          message: 'Missing or invalid Bearer token in request Authorization header.',
          timestamp: new Date().toISOString(),
        },
        explanation: '❌ Request bị từ chối do Header Authorization không tồn tại (User chưa đăng nhập).',
      };
    }

    if (endpoint.startsWith('/api/admin/metrics') && user?.role !== 'admin') {
      useBoundStore.getState().addToast({
        type: 'warning',
        message: '⚠️ 403 Forbidden: Chỉ tài khoản Admin mới có quyền xem Metrics!',
      });
      return {
        endpoint,
        method,
        headersSent: headers,
        authHeaderAttached: true,
        authHeaderValue: `Bearer ${token.substring(0, 15)}...`,
        status: 403,
        statusText: 'Forbidden',
        responseBody: {
          error: 'Forbidden',
          message: `Role "${user?.role}" is not permitted to access Admin Metrics.`,
          user: user?.username,
        },
        explanation: '⚠️ Token đã gửi đi thành công qua Interceptor, nhưng quyền hạn Role không đủ.',
      };
    }

    useBoundStore.getState().addToast({
      type: 'success',
      message: `✅ 200 OK: Truy cập thành công với Token (${user?.role})`,
    });

    return {
      endpoint,
      method,
      headersSent: headers,
      authHeaderAttached: true,
      authHeaderValue: `Bearer ${token.substring(0, 15)}...`,
      status: 200,
      statusText: 'OK',
      responseBody: {
        success: true,
        data: {
          totalUsers: 48920,
          activeServers: 12,
          monthlyRevenueUSD: 184500,
          systemHealth: '99.98% Healthy',
          accessedBy: user?.username,
          role: user?.role,
        },
      },
      explanation: '✅ Request Interceptor đã tự động lấy token từ Zustand và gắn Authorization: Bearer <jwt>. Máy chủ xác thực thành công!',
    };
  }

  // Public endpoint
  useBoundStore.getState().addToast({
    type: 'info',
    message: 'ℹ️ 200 OK: Truy cập API công khai (Public News)',
  });

  return {
    endpoint,
    method,
    headersSent: headers,
    authHeaderAttached: Boolean(headers['Authorization']),
    authHeaderValue: headers['Authorization'] ? `Bearer ${token?.substring(0, 15)}...` : null,
    status: 200,
    statusText: 'OK',
    responseBody: {
      success: true,
      news: [
        { id: 1, title: 'Ra mắt tính năng Zustand Slice & Interceptor v2.0', date: '2026-09-04' },
        { id: 2, title: 'Bảo trì hệ thống định kỳ vào 02:00 sáng', date: '2026-09-05' },
      ],
    },
    explanation: headers['Authorization']
      ? 'ℹ️ API công khai nhận được token đính kèm tự động từ Interceptor.'
      : 'ℹ️ API công khai không cần token, Interceptor an toàn không gắn header rác.',
  };
};
