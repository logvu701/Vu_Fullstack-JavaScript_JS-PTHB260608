import axios, { AxiosInstance } from "axios";
import { UserProfile, PartialUserProfile, ExecutionLog } from "../types/user";

export const INITIAL_USER: UserProfile = {
  id: "EMP-2026",
  fullName: "Đỗ Minh Khang",
  email: "khang.do@rikkeiedu.vn",
  phone: "0909123456",
  department: "Công nghệ thông tin",
  position: "Senior Fullstack Developer",
  salary: 35000000,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  status: "Active",
  address: "Tòa nhà Handico, Đường Phạm Hùng, Nam Từ Liêm, Hà Nội",
};

// In-memory server database to demonstrate real standard RESTful server behavior
let serverDatabase: UserProfile = { ...INITIAL_USER };

export function resetServerDatabase(): UserProfile {
  serverDatabase = { ...INITIAL_USER };
  return { ...serverDatabase };
}

export function getCurrentServerState(): UserProfile {
  return { ...serverDatabase };
}

// Axios instance
export const userClient: AxiosInstance = axios.create({
  baseURL: "https://api.hrm.internal/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Custom adapter to strictly simulate standard RESTful RFC behavior in browser
userClient.interceptors.request.use(async (config) => {
  // Let custom mock adapter handle the response
  return config;
});

/**
 * HÀM 1: Cập nhật hồ sơ bằng AXIOS.PUT
 * Chuẩn RFC 7231: PUT là phương thức thay thế TOÀN BỘ tài nguyên (Full Replacement).
 * Payload: Phải chứa đầy đủ tất cả 10 trường của User.
 * Bẫy nghiệp vụ: Nếu gửi thiếu trường (chỉ gửi phone), máy chủ RESTful tiêu chuẩn
 * sẽ ghi đè tài nguyên, khiến các trường bị thiếu bị mất vĩnh viễn (undefined/null/omitted).
 */
export async function updateUserWithPut(
  id: string,
  payload: Record<string, any>
): Promise<{ user: any; log: ExecutionLog }> {
  const url = `/users/${id}`;
  
  // Mô phỏng hành vi của RESTful Server tiêu chuẩn đối với PUT:
  // Ghi đè toàn bộ: Bản ghi mới = { id, ...payload } (bất kỳ trường cũ nào không có trong payload đều bị XÓA!)
  const oldState = { ...serverDatabase };
  const allKnownFields = Object.keys(INITIAL_USER).filter((k) => k !== "id");
  const missingFields = allKnownFields.filter((key) => !(key in payload));
  
  // Ghi đè máy chủ:
  const newServerState: any = { id };
  for (const key of Object.keys(payload)) {
    newServerState[key] = payload[key];
  }
  serverDatabase = newServerState;

  const dataLossOccurred = missingFields.length > 0;

  const log: ExecutionLog = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    method: "PUT",
    url: `https://api.hrm.internal/v1/users/${id}`,
    payload,
    response: newServerState,
    dataLossWarning: dataLossOccurred,
    lostFields: missingFields,
    explanation: dataLossOccurred
      ? `[CẢNH BÁO BẪY NGHIỆP VỤ - DATA LOSS]: Phương thức PUT theo chuẩn RFC 7231 thay thế toàn bộ bản ghi. Do payload thiếu ${missingFields.length} trường (${missingFields.join(", ")}), máy chủ đã XÓA TOÀN BỘ các trường này khỏi cơ sở dữ liệu!`
      : `[THÀNH CÔNG - FULL REPLACEMENT]: Phương thức PUT đã ghi đè toàn bộ 10 trường dữ liệu một cách an toàn và trọn vẹn theo đúng chuẩn Idempotent.`,
  };

  return { user: { ...serverDatabase }, log };
}

/**
 * HÀM 2: Cập nhật hồ sơ bằng AXIOS.PATCH
 * Chuẩn RFC 5789: PATCH là phương thức cập nhật TỪNG PHẦN (Partial Modification).
 * Payload: Chỉ cần chứa các trường cần thay đổi (ví dụ: { phone: "0988776655" }).
 * Máy chủ sẽ hợp nhất (merge) các trường này vào bản ghi hiện có mà không ảnh hưởng các trường khác.
 */
export async function updateUserWithPatch(
  id: string,
  payload: PartialUserProfile
): Promise<{ user: UserProfile; log: ExecutionLog }> {
  const url = `/users/${id}`;

  // Mô phỏng hành vi của RESTful Server tiêu chuẩn đối với PATCH:
  // Hợp nhất (Partial merge): serverDatabase = { ...serverDatabase, ...payload }
  serverDatabase = {
    ...serverDatabase,
    ...payload,
  };

  const updatedFieldNames = Object.keys(payload);

  const log: ExecutionLog = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    method: "PATCH",
    url: `https://api.hrm.internal/v1/users/${id}`,
    payload,
    response: { ...serverDatabase },
    dataLossWarning: false,
    explanation: `[THÀNH CÔNG - PARTIAL UPDATE]: Phương thức PATCH theo chuẩn RFC 5789 chỉ cập nhật các trường được chỉ định (${updatedFieldNames.join(", ")}). Toàn bộ các trường còn lại được giữ nguyên vẹn 100%!`,
  };

  return { user: { ...serverDatabase }, log };
}
