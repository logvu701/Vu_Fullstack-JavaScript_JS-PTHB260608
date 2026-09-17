export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  group: "Đồng nghiệp" | "Khách hàng" | "Đối tác" | "Gia đình" | "Bạn bè" | "Khác";
  createdAt: string;
}

export type CreateContactInput = Omit<Contact, "id" | "createdAt">;

export interface ApiLogEntry {
  id: string;
  timestamp: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  url: string;
  status?: number;
  statusText?: string;
  payload?: any;
  response?: any;
  error?: string;
  isTrap?: boolean;
}
