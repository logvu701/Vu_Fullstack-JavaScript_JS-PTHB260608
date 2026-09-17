import { AxiosRequestConfig } from "axios";

export interface CleanParamsOptions {
  removeUndefined?: boolean;
  removeNull?: boolean;
  removeEmptyString?: boolean;
  removeNaN?: boolean;
  trimStrings?: boolean;
}

export interface ResilientClientConfig extends AxiosRequestConfig {
  baseURL?: string;
  timeout?: number;
  getToken?: () => string | null;
  onUnauthorized?: (err: any) => void;
  onServerError?: (err: any) => void;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  details?: any;
  isHandledByResilientClient: boolean;
  timestamp: string;
}

export interface ClientExecutionLog {
  id: string;
  timestamp: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  rawParams?: any;
  cleanedParams?: any;
  payload?: any;
  unwrappedData?: any;
  status: number | string;
  error?: string;
  scenario?: string;
}
