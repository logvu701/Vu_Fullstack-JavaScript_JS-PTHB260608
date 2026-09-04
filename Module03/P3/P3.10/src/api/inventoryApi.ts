import type { InventoryItem, InventoryCategory, UpdateInventoryPayload } from '../types/inventory';

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-101',
    sku: 'EL-MBP-M3',
    name: 'MacBook Pro 14" M3 Pro 18GB/512GB Space Black',
    category: 'Electronics',
    quantity: 24,
    minThreshold: 10,
    unitPrice: 48990000,
    location: { aisle: 'A-02', shelf: 'S-04', bin: 'B-12' },
    lastUpdated: '2026-09-04 09:30',
  },
  {
    id: 'inv-102',
    sku: 'EL-SNY-WH5',
    name: 'Tai nghe Chống ồn Sony WH-1000XM5 Silver',
    category: 'Electronics',
    quantity: 8,
    minThreshold: 10,
    unitPrice: 7990000,
    location: { aisle: 'A-02', shelf: 'S-02', bin: 'B-05' },
    lastUpdated: '2026-09-04 10:15',
  },
  {
    id: 'inv-103',
    sku: 'AP-TSH-COT',
    name: 'Áo Thun Premium Heavyweight Cotton Unisex Black',
    category: 'Apparel',
    quantity: 142,
    minThreshold: 20,
    unitPrice: 350000,
    location: { aisle: 'B-01', shelf: 'S-03', bin: 'B-08' },
    lastUpdated: '2026-09-04 08:00',
  },
  {
    id: 'inv-104',
    sku: 'AP-HD-OVS',
    name: 'Áo Hoodie Oversize French Terry Heather Grey',
    category: 'Apparel',
    quantity: 5,
    minThreshold: 15,
    unitPrice: 680000,
    location: { aisle: 'B-01', shelf: 'S-05', bin: 'B-02' },
    lastUpdated: '2026-09-04 11:20',
  },
  {
    id: 'inv-105',
    sku: 'FD-MTC-UJI',
    name: 'Bột Trà Xanh Matcha Uji Kyoto Ceremonial Grade 100g',
    category: 'Food',
    quantity: 0,
    minThreshold: 12,
    unitPrice: 450000,
    location: { aisle: 'C-03', shelf: 'S-01', bin: 'B-14' },
    lastUpdated: '2026-09-03 16:45',
  },
  {
    id: 'inv-106',
    sku: 'FD-CFE-ARA',
    name: 'Cà Phê Arabica Cầu Đất Rang Mộc Specialty 250g',
    category: 'Food',
    quantity: 65,
    minThreshold: 15,
    unitPrice: 195000,
    location: { aisle: 'C-03', shelf: 'S-02', bin: 'B-09' },
    lastUpdated: '2026-09-04 07:15',
  },
  {
    id: 'inv-107',
    sku: 'OF-CHR-ERG',
    name: 'Ghế Công Thái Học Ergonomic Chair Lumbar Support Pro',
    category: 'Office',
    quantity: 12,
    minThreshold: 8,
    unitPrice: 5800000,
    location: { aisle: 'D-04', shelf: 'S-01', bin: 'B-01' },
    lastUpdated: '2026-09-04 14:00',
  },
  {
    id: 'inv-108',
    sku: 'OF-DSK-MAT',
    name: 'Thảm Da Trải Bàn Bàn Phím & Chuột Desk Mat Da PU',
    category: 'Office',
    quantity: 3,
    minThreshold: 10,
    unitPrice: 280000,
    location: { aisle: 'D-04', shelf: 'S-03', bin: 'B-11' },
    lastUpdated: '2026-09-04 13:10',
  },
];

let inMemoryInventory: InventoryItem[] = [...INITIAL_INVENTORY];

export const resetMockInventory = () => {
  inMemoryInventory = [...INITIAL_INVENTORY];
};

/**
 * Fetch danh sách tồn kho từ Server (Mô phỏng độ trễ 400ms)
 */
export const fetchInventoryApi = async (
  search: string = '',
  category: InventoryCategory = 'All'
): Promise<InventoryItem[]> => {
  await new Promise((r) => setTimeout(r, 400));

  let filtered = [...inMemoryInventory];

  if (category !== 'All') {
    filtered = filtered.filter((i) => i.category === category);
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.location.aisle.toLowerCase().includes(q)
    );
  }

  return filtered;
};

/**
 * Cập nhật số lượng tồn kho với đầy đủ Validation nghiệp vụ & Bẫy lỗi
 */
export const updateInventoryQuantityApi = async (
  payload: UpdateInventoryPayload,
  shouldFail: boolean = false
): Promise<InventoryItem> => {
  // Giả lập độ trễ mạng 800ms
  await new Promise((r) => setTimeout(r, 800));

  if (shouldFail) {
    throw new Error('❌ [Server 500]: Lỗi phân quyền cập nhật cơ sở dữ liệu kho!');
  }

  const index = inMemoryInventory.findIndex((i) => i.id === payload.itemId);
  if (index === -1) {
    throw new Error('Không tìm thấy sản phẩm trong kho!');
  }

  const currentItem = inMemoryInventory[index];
  let nextQuantity = currentItem.quantity;

  if (payload.adjustmentType === 'add') {
    nextQuantity += payload.value;
  } else if (payload.adjustmentType === 'subtract') {
    nextQuantity -= payload.value;
  } else if (payload.adjustmentType === 'set') {
    nextQuantity = payload.value;
  }

  // BẪY DỮ LIỆU & VALIDATION
  if (nextQuantity < 0) {
    throw new Error(`⚠️ [Validation Error]: Số lượng tồn kho sau điều chỉnh (${nextQuantity}) không thể âm!`);
  }

  if (nextQuantity > 10000) {
    throw new Error(`⚠️ [Quota Exceeded]: Số lượng tồn kho sau điều chỉnh (${nextQuantity}) vượt quá định mức tối đa 10,000 cái!`);
  }

  const updatedItem: InventoryItem = {
    ...currentItem,
    quantity: nextQuantity,
    lastUpdated: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN'),
  };

  inMemoryInventory[index] = updatedItem;
  return updatedItem;
};
