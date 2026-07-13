export type typeNotifications = 'compliance_alert' | 'order_status' | 'system';

export interface Notification {
    id: number;
    userId: number | null;
    type: typeNotifications;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}