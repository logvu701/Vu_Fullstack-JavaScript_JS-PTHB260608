import axios, { AxiosInstance } from "axios";
import { setupInterceptors } from "./interceptors";
import { ResilientClientConfig } from "./types";

export const DEFAULT_TIMEOUT_MS = 5000;
export const DEFAULT_BASE_URL = "https://api.resilient-gateway.vn/v1";

// Auth token store
let inMemoryToken: string | null = "resilient_jwt_token_sample_123456";

export function setModuleToken(token: string | null): void {
  inMemoryToken = token;
}

export function getModuleToken(): string | null {
  return inMemoryToken;
}

/**
 * Khởi tạo Axios Instance chuẩn kiến trúc Production
 */
export function createResilientClient(config?: ResilientClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config?.baseURL || DEFAULT_BASE_URL,
    timeout: config?.timeout || DEFAULT_TIMEOUT_MS, // Cấu hình timeout 5000ms
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
  });

  // Tích hợp hệ thống Interceptors
  setupInterceptors(client, {
    getToken: getModuleToken,
    ...config,
  });

  return client;
}

// Global Singleton Instance
export const apiClient = createResilientClient();
