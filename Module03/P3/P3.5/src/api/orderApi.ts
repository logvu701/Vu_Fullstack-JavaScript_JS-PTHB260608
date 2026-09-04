import type { Order, OrderStatus } from '../types/order';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-8921',
    customerName: 'Nguyễn Văn An',
    email: 'an.nguyen@example.com',
    product: 'Khóa học React 19 & TypeScript Master',
    amount: 1890000,
    status: 'Pending',
    createdAt: '2026-09-04 14:30',
  },
  {
    id: 'ORD-8922',
    customerName: 'Trần Thị Mai',
    email: 'mai.tran@example.com',
    product: 'Fullstack Next.js 15 & PostgreSQL',
    amount: 3200000,
    status: 'Shipped',
    createdAt: '2026-09-04 11:15',
  },
  {
    id: 'ORD-8923',
    customerName: 'Lê Hoàng Nam',
    email: 'nam.le@example.com',
    product: 'DevOps & Docker Kubernetes Cloud',
    amount: 2490000,
    status: 'Delivered',
    createdAt: '2026-09-03 16:45',
  },
  {
    id: 'ORD-8924',
    customerName: 'Phạm Hồng Đức',
    email: 'duc.pham@example.com',
    product: 'Node.js Microservices Architecture',
    amount: 2190000,
    status: 'Pending',
    createdAt: '2026-09-03 09:20',
  },
  {
    id: 'ORD-8925',
    customerName: 'Vũ Minh Thư',
    email: 'thu.vu@example.com',
    product: 'Khóa học React 19 & TypeScript Master',
    amount: 1890000,
    status: 'Delivered',
    createdAt: '2026-09-02 18:00',
  },
  {
    id: 'ORD-8926',
    customerName: 'Hoàng Quốc Tuấn',
    email: 'tuan.hoang@example.com',
    product: 'Data AI & Python Machine Learning',
    amount: 4500000,
    status: 'Shipped',
    createdAt: '2026-09-01 10:30',
  },
];

/**
 * Mock API lấy danh sách đơn hàng có trễ mạng (Network Latency ~400ms)
 */
export const fetchOrders = async (
  status: OrderStatus,
  searchQuery: string,
  minAmount: number
): Promise<{ orders: Order[]; totalCount: number }> => {
  // Giả lập độ trễ mạng
  await new Promise((resolve) => setTimeout(resolve, 400));

  const query = searchQuery.toLowerCase().trim();

  const filtered = MOCK_ORDERS.filter((order) => {
    // 1. Lọc theo trạng thái
    if (status !== 'All' && order.status !== status) {
      return false;
    }

    // 2. Lọc theo giá tối thiểu
    if (order.amount < minAmount) {
      return false;
    }

    // 3. Tìm kiếm theo tên khách, email, mã đơn, tên sản phẩm
    if (query) {
      const matchCustomer = order.customerName.toLowerCase().includes(query);
      const matchEmail = order.email.toLowerCase().includes(query);
      const matchId = order.id.toLowerCase().includes(query);
      const matchProduct = order.product.toLowerCase().includes(query);
      if (!matchCustomer && !matchEmail && !matchId && !matchProduct) {
        return false;
      }
    }

    return true;
  });

  return { orders: filtered, totalCount: filtered.length };
};
