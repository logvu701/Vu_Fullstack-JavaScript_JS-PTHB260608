import { apiClient, setModuleToken, getModuleToken } from "./httpClient";
import { cleanParams } from "./paramCleaner";
export * from "./types";
export { apiClient, setModuleToken, getModuleToken, cleanParams };

/**
 * =========================================================================
 * CÁC HÀM EXPORT CHUẨN HÓA DÀNH CHO CẢ DỰ ÁN TÁI SỬ DỤNG
 * =========================================================================
 */

/**
 * Hàm GET chuẩn hóa
 * Bẫy dữ liệu: Tự động tiền xử lý dọn dẹp params rác (undefined, null, NaN, "")
 * trước khi chuyển tiếp cho Axios.
 */
export async function get<T = any>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  // Tiền xử lý dọn dẹp params rác
  const sanitizedParams = cleanParams(params);

  // Gửi request qua Axios Client (Response Interceptor tự unwrap trả về data: T)
  const result = await apiClient.get(url, {
    params: sanitizedParams,
  });

  return result as unknown as T;
}

/**
 * Hàm POST chuẩn hóa
 */
export async function post<T = any>(
  url: string,
  data?: any
): Promise<T> {
  const result = await apiClient.post(url, data);
  return result as unknown as T;
}

/**
 * Hàm PUT chuẩn hóa
 */
export async function put<T = any>(
  url: string,
  data?: any
): Promise<T> {
  const result = await apiClient.put(url, data);
  return result as unknown as T;
}

/**
 * Hàm REMOVE (DELETE) chuẩn hóa
 */
export async function remove<T = any>(
  url: string
): Promise<T> {
  const result = await apiClient.delete(url);
  return result as unknown as T;
}
