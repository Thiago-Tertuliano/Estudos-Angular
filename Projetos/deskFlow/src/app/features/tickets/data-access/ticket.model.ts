export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    requesterName: string;
    createdAt: string;
    updateAt: string;
}

export interface TicketFilters {
    search: string;
    status: TicketStatus | 'all';
    priority: TicketPriority | 'all';
}

export interface TicketFormValue {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    requesterName: string; 
}

export const TICKET_STATUS_LABELS:
Record<TicketStatus, string> = {
    open: 'Aberto',
    in_progress: 'Em andamento',
    resolved: 'Resolvido',
    closed: 'Fechado',
};

export const TICKET_PRIORITY_LABELS:
Record<TicketPriority, string> = {
    low: 'Baixa',
    medium: 'Médio',
    high: 'Alto',
    critical: 'Critico',
};