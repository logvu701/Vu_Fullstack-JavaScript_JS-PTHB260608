import type { DisputeOrder } from '../types/dispute';

export const INITIAL_DISPUTES: DisputeOrder[] = [
  {
    id: 'dsp-1',
    orderCode: 'ORD-9901',
    customerName: 'Lê Hoàng Long',
    amount: 3450000,
    violationType: 'Nghi vấn gian lận thẻ tín dụng',
    status: 'Violation',
    updatedAt: '2026-09-04 10:15',
  },
  {
    id: 'dsp-2',
    orderCode: 'ORD-9902',
    customerName: 'Phạm Thị Bích',
    amount: 1890000,
    violationType: 'Yêu cầu hoàn tiền bất thường',
    status: 'Violation',
    updatedAt: '2026-09-04 11:20',
  },
  {
    id: 'dsp-3',
    orderCode: 'ORD-9903',
    customerName: 'Trần Văn Cường',
    amount: 5200000,
    violationType: 'IP đăng nhập từ nước ngoài trái phép',
    status: 'Violation',
    updatedAt: '2026-09-04 12:00',
  },
  {
    id: 'dsp-4',
    orderCode: 'ORD-9904',
    customerName: 'Nguyễn Thị Hoa',
    amount: 2190000,
    violationType: 'Đơn hàng trùng lặp hệ thống',
    status: 'Violation',
    updatedAt: '2026-09-04 13:45',
  },
];

let currentDisputes: DisputeOrder[] = [...INITIAL_DISPUTES];

export const resetMockDisputes = () => {
  currentDisputes = [...INITIAL_DISPUTES];
};

export const fetchDisputes = async (): Promise<DisputeOrder[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...currentDisputes];
};

/**
 * Mock API cập nhật trạng thái đơn hàng vi phạm:
 * - Có độ trễ 2000ms (2 giây)
 * - Nếu shouldFail = true, ném lỗi 500 để kiểm thử cơ chế onError Rollback!
 */
export const updateDisputeStatusApi = async (
  orderId: string,
  newStatus: 'Resolved',
  shouldFail: boolean = false
): Promise<DisputeOrder> => {
  // Giả lập Server nước ngoài độ trễ 2000ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (shouldFail) {
    throw new Error('❌ [Server Error 500]: Máy chủ cơ sở dữ liệu từ chối cập nhật!');
  }

  const idx = currentDisputes.findIndex((d) => d.id === orderId);
  if (idx === -1) {
    throw new Error('Không tìm thấy đơn hàng!');
  }

  const updated: DisputeOrder = {
    ...currentDisputes[idx],
    status: newStatus,
    updatedAt: new Date().toLocaleTimeString(),
  };

  currentDisputes[idx] = updated;
  return updated;
};
