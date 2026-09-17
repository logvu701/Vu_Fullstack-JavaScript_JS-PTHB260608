import axios, { AxiosError } from "axios";
import { Contact, CreateContactInput } from "../types/contact";

export const API_BASE_URL = "http://localhost:3004";

export const contactClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

/**
 * Lấy danh sách toàn bộ danh bạ (GET /contacts)
 */
export async function getContacts(): Promise<Contact[]> {
  try {
    const response = await contactClient.get<Contact[]>("/contacts");
    return response.data;
  } catch (err) {
    handleAxiosError(err, "Không thể tải danh sách danh bạ");
    throw err;
  }
}

/**
 * Thêm một liên hệ mới vào danh bạ (POST /contacts)
 */
export async function addContact(payload: CreateContactInput): Promise<Contact> {
  try {
    const newContact = {
      ...payload,
      createdAt: new Date().toISOString(),
    };
    const response = await contactClient.post<Contact>("/contacts", newContact);
    return response.data;
  } catch (err) {
    handleAxiosError(err, "Không thể thêm liên hệ mới");
    throw err;
  }
}

/**
 * Xóa một số điện thoại / liên hệ theo ID (DELETE /contacts/:id)
 * Bẫy dữ liệu: Khi xóa ID không tồn tại (vd: "999999"), mock server trả về 404 Not Found.
 * Hàm này bắt lỗi 404 và ném ra thông điệp chuẩn mực.
 */
export async function deleteContact(id: string): Promise<{ success: boolean; id: string }> {
  try {
    await contactClient.delete(`/contacts/${id}`);
    return { success: true, id };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 404) {
        const customError = new Error(
          `[Bẫy dữ liệu 404 Not Found] Không tìm thấy liên hệ có ID "${id}" trên hệ thống mock server! Yêu cầu xóa thất bại.`
        );
        (customError as any).status = 404;
        (customError as any).isTrapCaught = true;
        throw customError;
      }
    }
    handleAxiosError(err, `Không thể xóa liên hệ ID: ${id}`);
    throw err;
  }
}

/**
 * Trợ giúp phân loại và in lỗi Axios rõ ràng
 */
function handleAxiosError(err: unknown, fallbackMessage: string): void {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<{ message?: string }>;
    if (axiosError.code === "ECONNREFUSED" || axiosError.message.includes("Network Error")) {
      console.error(
        "[Axios Network Error] Không thể kết nối tới Mock Server cổng 3004. Hãy đảm bảo bạn đã khởi chạy: npm run server",
        err
      );
    } else {
      console.error(`[Axios API Error ${axiosError.response?.status}]:`, axiosError.response?.data || axiosError.message);
    }
  } else {
    console.error(`[Unexpected Error]: ${fallbackMessage}`, err);
  }
}
