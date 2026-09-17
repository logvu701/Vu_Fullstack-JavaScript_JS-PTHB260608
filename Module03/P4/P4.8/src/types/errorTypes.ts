export interface AuthSession {
  user: {
    id: string;
    username: string;
    name: string;
    role: string;
  } | null;
  token: string | null;
}

export interface ErrorEventLog {
  id: string;
  timestamp: string;
  status: number;
  statusText: string;
  message: string;
  handledBy: "GLOBAL_INTERCEPTOR" | "LOCAL_CATCH";
  actionTaken: string;
  endpoint: string;
}
