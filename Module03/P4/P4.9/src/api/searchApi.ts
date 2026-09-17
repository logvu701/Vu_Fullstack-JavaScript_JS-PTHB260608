import axios, { CanceledError } from "axios";
import { Product } from "../types/search";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "PROD-01",
    name: "iPhone 16 Pro Max 256GB Titan Tự Nhiên",
    category: "Điện thoại",
    price: 34990000,
    inStock: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-02",
    name: "iPhone 15 128GB Xanh Pastel",
    category: "Điện thoại",
    price: 19490000,
    inStock: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-03",
    name: "iPad Pro M4 11 inch Wi-Fi 256GB Space Black",
    category: "Máy tính bảng",
    price: 27990000,
    inStock: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-04",
    name: "MacBook Pro 14 inch M3 Pro 18GB 512GB",
    category: "Laptop",
    price: 48990000,
    inStock: true,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-05",
    name: "AirPods Pro 2 USB-C MagSafe Chống Ồn",
    category: "Tai nghe",
    price: 5890000,
    inStock: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-06",
    name: "Samsung Galaxy S24 Ultra 5G 512GB Xám Titan",
    category: "Điện thoại",
    price: 31990000,
    inStock: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-07",
    name: "Sony WH-1000XM5 Tai Nghe Bluetooth Chống Ồn",
    category: "Tai nghe",
    price: 7490000,
    inStock: false,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "PROD-08",
    name: "Dell XPS 15 9530 Core i7-13700H RTX 4050",
    category: "Laptop",
    price: 45990000,
    inStock: true,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&auto=format&fit=crop&q=80",
  },
];

/**
 * Gọi API Tìm kiếm sản phẩm tích hợp AbortSignal của Axios / Fetch
 * Bẫy dữ liệu: Quá trình abort sẽ ném ra CanceledError.
 * Hàm này tuân thủ chuẩn Web API và Axios signal.
 */
export async function searchProductsApi(
  query: string,
  signal?: AbortSignal,
  simulatedDelayMs: number = 700
): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    // Nếu signal đã bị abort từ trước khi chạy
    if (signal?.aborted) {
      return reject(new CanceledError("canceled: Request bị hủy trước khi gửi"));
    }

    let timer: any = null;

    // Lắng nghe sự kiện abort từ AbortController
    const onAbort = () => {
      clearTimeout(timer);
      reject(new CanceledError("canceled: Người dùng đã gõ ký tự mới, request cũ bị hủy"));
    };

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    timer = setTimeout(() => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }

      const q = query.trim().toLowerCase();
      if (!q) {
        return resolve(MOCK_PRODUCTS);
      }

      const filtered = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
      resolve(filtered);
    }, simulatedDelayMs);
  });
}

export const isCancel = axios.isCancel;
