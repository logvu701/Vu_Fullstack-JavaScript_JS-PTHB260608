export type DisputeStatus = 'Violation' | 'UnderReview' | 'Resolved';

export interface DisputeOrder {
  id: string;
  orderCode: string;
  customerName: string;
  amount: number;
  violationType: string;
  status: DisputeStatus;
  updatedAt: string;
}

export interface DisputeLog {
  id: string;
  orderId: string;
  action: string;
  timestamp: string;
  status: 'optimistic' | 'success' | 'rollback';
  detail: string;
}
