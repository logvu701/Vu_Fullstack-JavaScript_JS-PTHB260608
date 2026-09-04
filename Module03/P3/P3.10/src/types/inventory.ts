export type InventoryCategory = 'All' | 'Electronics' | 'Apparel' | 'Food' | 'Office';

export interface WarehouseLocation {
  aisle: string;
  shelf: string;
  bin: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: Exclude<InventoryCategory, 'All'>;
  quantity: number;
  minThreshold: number;
  unitPrice: number;
  location: WarehouseLocation;
  lastUpdated: string;
}

export type AdjustmentType = 'add' | 'subtract' | 'set';

export interface UpdateInventoryPayload {
  itemId: string;
  adjustmentType: AdjustmentType;
  value: number;
  reason?: string;
}

export interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
