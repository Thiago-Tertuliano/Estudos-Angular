export type TableStatus = 'Available' | "Occupied" | "Reserved";

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
}
