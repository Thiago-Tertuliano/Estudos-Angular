export type typeOrder = 'buy' | 'sell';
export type statusOrder = 'draft' | 'pending_compliance' | 'approved' | 'rejected' | 'sent' | 'partially_filled' | 'filled' | 'cancelled';

export interface Order {
    id: number;
    clientId: number;
    assetId: number;
    type: typeOrder;
    quantity: number;
    price: number;
    status: statusOrder;
    complianceCheckId?: number;
    rejectionReason?: string;
    filledQuantity: number;
    totalValue: number;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
}