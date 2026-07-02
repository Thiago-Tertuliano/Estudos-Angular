export type OrderStatus = 'Open' | 'Preparing' | 'Finish';

export interface Order {
  id: string;
  tableId: string;
  waiterId: string;
  totalPrice: number;
  status: OrderStatus;
  openedAt: string;
  closedAt: string | null;
}

export interface CreateOrderPayload {
  tableId: string;
  waiterId: string;
}
