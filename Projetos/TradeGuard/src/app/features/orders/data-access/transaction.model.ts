export type typeTransaction = 'execution' | 'reversal';

export interface Transaction {
    id: number;
    orderId: number;
    quantity: number;
    price: number;
    totalValue: number;
    type: typeTransaction;
    executedAt: string;
}