import { Order } from "@features/orders/data-access/order.model";
import { Table } from "@features/tables/data-access/table.model";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export const DEMO_USER: User = {
  id: '1',
  email: 'test@test.com',
  password: '123',
  name: 'Test User',
};

export const MOCK_TABLES: Table[] = [
  {
    id: '1',
    number: 1,
    capacity: 4,
    status: 'Available',
  },
  {
    id: '2',
    number: 2,
    capacity: 6,
    status: 'Available',
  },
  {
    id: '3',
    number: 3,
    capacity: 8,
    status: 'Occupied',
  },
  {
    id: '4',
    number: 4,
    capacity: 10,
    status: 'Available',
  },
  {
    id: '5',
    number: 5,
    capacity: 12,
    status: 'Reserved',
  },
  {
    id: '6',
    number: 6,
    capacity: 14,
    status: 'Available',
  },
];

export const MOCK_ORDERS: Order[] = [{
    id: '1',
    tableId: '1',
    waiterId: '1',
    totalPrice: 100,
    status: 'Open',
    openedAt: new Date().toISOString(),
    closedAt: null,
  },
    {
      id: '2',
      tableId: '3',
      waiterId: '3',
      totalPrice: 300,
      status: 'Finish',
      openedAt: new Date().toISOString(),
      closedAt: new Date().toISOString(),
    },
];
