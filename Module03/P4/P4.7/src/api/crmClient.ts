import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Customer, DealStat, NetworkInspection } from "../types/crm";

export const MOCK_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDUk0tODg5Iiwicm9sZSI6IlNhbGVzRGlyZWN0b3IiLCJleHAiOjE3NzM4NDAwMDB9.sK2918aLzQ_98XvNqM4P";

// Storage state helper
let currentToken: string | null = MOCK_JWT_TOKEN;

export function getAuthToken(): string | null {
  return currentToken;
}

export function setAuthToken(token: string | null): void {
  currentToken = token;
}

export const crmClient: AxiosInstance = axios.create({
  baseURL: "https://api.crm-enterprise.vn/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

/**
 * =========================================================================
 * REQUEST INTERCEPTOR: TỰ ĐỘNG TIÊM ACCESS TOKEN
 * =========================================================================
 * Mục tiêu: Can thiệp vòng đời Request để tiêm siêu dữ liệu xác thực dùng chung.
 * Bẫy dữ liệu:
 * - Khi người dùng chưa đăng nhập (token là null hoặc rỗng), interceptor phải
 *   bỏ qua việc gán header Authorization mà không làm sập ứng dụng (tránh lỗi type).
 * - Tuyệt đối không gán chuỗi "Bearer null" hoặc "Bearer undefined".
 * - Khi không có header, máy chủ sẽ tự động trả về lỗi 401 Unauthorized đúng chuẩn.
 */
crmClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    // BẪY DỮ LIỆU ĐÃ XỬ LÝ AN TOÀN:
    if (token && typeof token === "string" && token.trim().length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Đảm bảo không tồn tại header rác nếu không có token
      if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi cấu hình request trước khi bay ra ngoài mạng
    return Promise.reject(error);
  }
);

// Mock Database CRM
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Tập Đoàn Vingroup",
    company: "Vingroup JSC",
    email: "contact@vingroup.net",
    phone: "024 3974 9999",
    status: "VIP",
    dealValue: 1250000000,
  },
  {
    id: "CUST-002",
    name: "Công Ty Cổ Phần FPT",
    company: "FPT Corporation",
    email: "fptcorp@fpt.com.vn",
    phone: "024 7300 7300",
    status: "Customer",
    dealValue: 680000000,
  },
  {
    id: "CUST-003",
    name: "Tập Đoàn Viettel",
    company: "Viettel Telecom",
    email: "cskh@viettel.com.vn",
    phone: "1800 8098",
    status: "VIP",
    dealValue: 2100000000,
  },
  {
    id: "CUST-004",
    name: "Ngân Hàng MB Bank",
    company: "Military Commercial Joint Stock Bank",
    email: "mb247@mbbank.com.vn",
    phone: "1900 545426",
    status: "Prospect",
    dealValue: 450000000,
  },
  {
    id: "CUST-005",
    name: "Công ty Cổ phần Tiki",
    company: "Tiki Corporation",
    email: "partnership@tiki.vn",
    phone: "1900 6035",
    status: "Lead",
    dealValue: 230000000,
  },
];

const MOCK_DEAL_STATS: DealStat = {
  totalRevenue: 4710000000,
  activeLeads: 42,
  conversionRate: "28.6%",
  topSector: "Công nghệ & Tài chính ngân hàng",
};

/**
 * Adapter can thiệp trực tiếp để giả lập phản hồi của máy chủ bảo mật
 */
export async function executeCrmApiCall(
  endpoint: string,
  method: "GET" | "POST" = "GET"
): Promise<{ data: any; inspection: NetworkInspection }> {
  const url = `https://api.crm-enterprise.vn/v1${endpoint}`;

  // Chuẩn bị config thông qua Axios
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
  };

  // Kích hoạt request interceptor
  const finalConfig = await (crmClient.interceptors.request as any).handlers[0].fulfilled(
    { ...config, url, method }
  );

  const requestHeadersSnapshot: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  };

  if (finalConfig.headers?.Authorization) {
    requestHeadersSnapshot["Authorization"] = String(finalConfig.headers.Authorization);
  }

  const hasBearerToken = Boolean(requestHeadersSnapshot["Authorization"]);

  // Mô phỏng kiểm tra trên Server:
  if (!hasBearerToken) {
    const inspection: NetworkInspection = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      url,
      method,
      requestHeaders: requestHeadersSnapshot,
      status: 401,
      statusText: "Unauthorized",
      tokenInjected: false,
      error: "HTTP 401 Unauthorized: Thiếu header 'Authorization: Bearer <token>' hoặc phiên đăng nhập chưa được thiết lập.",
      isTrapCaught: true,
    };
    throw { status: 401, message: inspection.error, inspection };
  }

  // Nếu có Bearer token -> 200 OK
  const responseData = endpoint === "/customers" ? MOCK_CUSTOMERS : MOCK_DEAL_STATS;
  const inspection: NetworkInspection = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    url,
    method,
    requestHeaders: requestHeadersSnapshot,
    status: 200,
    statusText: "OK",
    tokenInjected: true,
    responseData,
  };

  return { data: responseData, inspection };
}
