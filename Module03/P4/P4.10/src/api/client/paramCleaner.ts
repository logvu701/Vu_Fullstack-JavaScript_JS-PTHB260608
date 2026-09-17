import { CleanParamsOptions } from "./types";

const DEFAULT_OPTIONS: CleanParamsOptions = {
  removeUndefined: true,
  removeNull: true,
  removeEmptyString: true,
  removeNaN: true,
  trimStrings: true,
};

/**
 * =========================================================================
 * BỘ TIỀN XỬ LÝ DỌN DẸP PARAMS RÁC (PARAM SANITIZER)
 * =========================================================================
 * Bẫy dữ liệu: Lập trình viên khác truyền tham số params không hợp lệ:
 * { keyword: "iphone", page: undefined, filter: null, sort: "", invalidNum: NaN }
 * Nếu đẩy trực tiếp qua Axios, URL sẽ bị biến thành:
 * ?keyword=iphone&page=undefined&filter=null&sort=&invalidNum=NaN
 * Hàm này loại bỏ hoàn toàn các giá trị rác trước khi đẩy qua mạng.
 */
export function cleanParams<T extends Record<string, any>>(
  params?: T | null,
  options: CleanParamsOptions = DEFAULT_OPTIONS
): Record<string, any> {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {};
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const cleaned: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    // 1. Kiểm tra undefined
    if (opts.removeUndefined && value === undefined) {
      continue;
    }

    // 2. Kiểm tra null
    if (opts.removeNull && value === null) {
      continue;
    }

    // 3. Kiểm tra NaN
    if (opts.removeNaN && typeof value === "number" && Number.isNaN(value)) {
      continue;
    }

    // 4. Kiểm tra chuỗi rỗng và cắt tỉa khoảng trắng
    if (typeof value === "string") {
      const trimmed = opts.trimStrings ? value.trim() : value;
      if (opts.removeEmptyString && trimmed === "") {
        continue;
      }
      cleaned[key] = trimmed;
      continue;
    }

    // Giữ lại các giá trị hợp lệ (bao gồm số 0, boolean false, mảng hợp lệ, object con)
    cleaned[key] = value;
  }

  return cleaned;
}
