import axios, { AxiosError, AxiosInstance } from "axios";
import { AuthSession, ErrorEventLog } from "../types/errorTypes";

export const DEFAULT_USER = {
  id: "ADM-99",
  username: "admin@enterprise.vn",
  name: "Nguyễn Tuấn Dũng",
  role: "Chuyên viên Quản trị Hệ thống",
};

export const INITIAL_TOKEN = "session_token_valid_xyz8899";

// Event listener registry for Global Interceptor
type ErrorListener = (log: ErrorEventLog) => void;
type SessionExpiredListener = (message: string) => void;

let errorListeners: ErrorListener[] = [];
let sessionExpiredListeners: SessionExpiredListener[] = [];

export function subscribeToErrorEvents(listener: ErrorListener) {
  errorListeners.push(listener);
  return () => {
    errorListeners = errorListeners.filter((l) => l !== listener);
  };
}

export function subscribeToSessionExpired(listener: SessionExpiredListener) {
  sessionExpiredListeners.push(listener);
  return () => {
    sessionExpiredListeners = sessionExpiredListeners.filter((l) => l !== listener);
  };
}

function notifyError(log: ErrorEventLog) {
  errorListeners.forEach((l) => l(log));
}

function notifySessionExpired(msg: string) {
  sessionExpiredListeners.forEach((l) => l(msg));
}

// Axios instance
export const globalClient: AxiosInstance = axios.create({
  baseURL: "https://api.system-gateway.vn/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * =========================================================================
 * RESPONSE INTERCEPTOR TOÀN CỤC (GLOBAL ERROR HANDLING)
 * =========================================================================
 * Yêu cầu:
 * - Thiết lập axios.interceptors.response.
 * - Bắt luồng thất bại (err: AxiosError) và đánh giá tham số status.
 * - Khi phiên đăng nhập hết hạn (mã 401), ngay lập tức kích hoạt chuyển hướng
 *   người dùng về trang Đăng nhập, dọn dẹp phiên và ngăn lỗi lan ra UI.
 */
globalClient.interceptors.response.use(
  (response) => {
    // Luồng thành công 2xx
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const endpoint = error.config?.url || "/unknown";

    if (status === 401) {
      // 1. Ghi nhận nhật ký chặn đứng lỗi ở tầng Interceptor toàn cục
      const errorLog: ErrorEventLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        status: 401,
        statusText: "Unauthorized",
        message: "Phiên đăng nhập đã hết hạn hoặc Token không hợp lệ!",
        handledBy: "GLOBAL_INTERCEPTOR",
        actionTaken: "Tự động xóa Token & chuyển hướng ngay lập tức về màn hình Đăng Nhập (Login).",
        endpoint,
      };
      notifyError(errorLog);

      // 2. Kích hoạt điều hướng toàn cục về trang Login
      notifySessionExpired(
        "Phiên đăng nhập đã hết hạn (HTTP 401). Trạm kiểm soát phản hồi toàn cục đã tự động đưa bạn về màn hình Đăng nhập!"
      );
    } else if (status === 403) {
      const errorLog: ErrorEventLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        status: 403,
        statusText: "Forbidden",
        message: "Bạn không có quyền truy cập tài nguyên bảo mật này!",
        handledBy: "GLOBAL_INTERCEPTOR",
        actionTaken: "Hiển thị cảnh báo Access Denied toàn cục.",
        endpoint,
      };
      notifyError(errorLog);
    } else if (status === 500) {
      const errorLog: ErrorEventLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        status: 500,
        statusText: "Internal Server Error",
        message: "Máy chủ máy chủ gặp sự cố sập luồng (Crash 500)!",
        handledBy: "GLOBAL_INTERCEPTOR",
        actionTaken: "Hiển thị Toast cảnh báo Server Crash và ghi nhận telemetry.",
        endpoint,
      };
      notifyError(errorLog);
    }

    // Luôn reject Promise để component (nếu có catch riêng) vẫn nhận được error nếu muốn xử lý thêm
    return Promise.reject(error);
  }
);

/**
 * Mô phỏng gọi API với các mã trạng thái HTTP khác nhau
 */
export async function simulateApiCall(
  scenario: "200" | "401" | "403" | "500" | "network_error",
  endpointName: string = "/analytics/summary"
): Promise<any> {
  const url = `${endpointName}?scenario=${scenario}`;

  // Giả lập trực tiếp kết quả thông qua interceptor pipeline
  if (scenario === "200") {
    return {
      status: 200,
      data: {
        success: true,
        metrics: {
          activeSessions: 1420,
          serverUptime: "99.98%",
          cpuLoad: "18.4%",
          memoryUsed: "4.2 GB / 16 GB",
        },
      },
    };
  }

  // Chuẩn bị AxiosError mô phỏng
  const errorObj: any = new Error(
    scenario === "401"
      ? "Request failed with status code 401 (Session Expired)"
      : scenario === "403"
      ? "Request failed with status code 403 (Forbidden)"
      : scenario === "500"
      ? "Request failed with status code 500 (Internal Server Error)"
      : "Network Error: Failed to connect"
  );
  errorObj.isAxiosError = true;
  errorObj.config = { url };

  if (scenario !== "network_error") {
    const statusCode = parseInt(scenario, 10);
    errorObj.response = {
      status: statusCode,
      statusText:
        scenario === "401"
          ? "Unauthorized"
          : scenario === "403"
          ? "Forbidden"
          : "Internal Server Error",
      data: {
        statusCode,
        error: errorObj.message,
      },
    };
  }

  // Đẩy qua interceptor để kiểm chứng luồng chặn bắt toàn cục
  try {
    const responseHandler = (globalClient.interceptors.response as any).handlers[0];
    await responseHandler.rejected(errorObj);
  } catch (caught) {
    throw caught;
  }
}
