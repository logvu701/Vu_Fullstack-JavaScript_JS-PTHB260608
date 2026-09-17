export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  rating: number;
  image: string;
}

export interface SearchRequestEvent {
  id: string;
  query: string;
  startTime: number;
  endTime?: number;
  durationMs?: number;
  simulatedDelay: number;
  status: "PENDING" | "ABORTED" | "RESOLVED" | "OVERWRITTEN_BY_RACE_CONDITION";
  resultCount?: number;
  isCanceledViaSignal?: boolean;
}
