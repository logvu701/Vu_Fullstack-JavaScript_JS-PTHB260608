import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ResilientClientConfig, ApiErrorResponse } from "./types";

export function setupInterceptors(
  client: AxiosInstance,
  config?: ResilientClientConfig
): void {
  // 1. REQUEST INTERCEPTOR: Tự động gắn Bearer Token an toàn
  client.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      const token = config?.getToken ? config.getToken() : null;

      if (token && typeof token === "string" && token.trim().length > 0) {
        reqConfig.headers.Authorization = `Bearer ${token}`;
      } else {
        // Đảm bảo không đính kèm header rác nếu không có token
        if (reqConfig.headers.Authorization) {
          delete reqConfig.headers.Authorization;
        }
      }

      return reqConfig;
    },
    (error) => Promise.reject(error)
  );

  // 2. RESPONSE INTERCEPTOR:
  // - Chỉ trả về response.data nếu thành công (Unwrap metadata của Axios)
  // - Chặn bắt lỗi 401 và 500 và Timeout 5000ms
  client.interceptors.response.use(
    (response) => {
      // ẨN ĐI CÁC METADATA CỦA AXIOS ĐỂ TẦNG UI GỌN HƠN:
      // Trả về trực tiếp response.data thay vì AxiosResponse { data, status, statusText, headers, config }
      return response.data;
    },
    (error: AxiosError) => {
      const status = error.response?.status;
      const isTimeout =
        error.code === "ECONNABORTED" || error.message.includes("timeout of 5000ms exceeded");

      const standardizedError: ApiErrorResponse = {
        statusCode: status || (isTimeout ? 408 : 0),
        message:
          status === 401
            ? "HTTP 401 Unauthorized: Phiên đăng nhập hết hạn hoặc Access Token không hợp lệ."
            : status === 500
            ? "HTTP 500 Internal Server Error: Máy chủ nội bộ gặp sự cố xử lý dữ liệu."
            : isTimeout
            ? "Network Timeout (5000ms): Yêu cầu vượt quá thời gian chờ quy định (5 giây)."
            : error.message || "Lỗi mạng không xác định.",
        details: error.response?.data,
        isHandledByResilientClient: true,
        timestamp: new Date().toISOString(),
      };

      // Xử lý chặn mã 401
      if (status === 401 && config?.onUnauthorized) {
        config.onUnauthorized(standardizedError);
      }

      // Xử lý chặn mã 500
      if (status === 500 && config?.onServerError) {
        config.onServerError(standardizedError);
      }

      return Promise.reject(standardizedError);
    }
  );
}
