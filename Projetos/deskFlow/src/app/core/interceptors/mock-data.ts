import { User } from '@features/auth/data-access/auth.model';
import { Ticket } from '@features/tickets/data-access/ticket.model';

export const DEMO_USER: User = {
  id: '1',
  email: 'dev@deskflow.app',
  name: 'Dev DeskFlow',
};

export const MOCK_TICKETS: Ticket[] = [{
   id: 'tkt-1',
    title: 'Impressora não imprime',
    description: 'Setor financeiro',
    status: 'open',
    priority: 'high',
    requesterName: 'Ana Silva',
    createdAt: '2026-07-08T10:00:00Z',
    updateAt: '2026-07-09T10:00:00Z',
  },
  {
     id: 'tkt-2',
    title: 'Impressora bugada',
    description: 'Setor industrial',
    status: 'open',
    priority: 'high',
    requesterName: 'Carlos magno',
    createdAt: '2026-07-07T10:00:00Z',
    updateAt: '2026-07-09T10:00:00Z',
  },
];

export const MockTicketStore = {
  tickets: [ ...MOCK_TICKETS],

  getAll(): Ticket[] {
    return this.tickets;
  },

  getById(id: string): Ticket | undefined {
    return this.tickets.find((t) => t.id === id);
  },

  add(ticket: Ticket): void {
    this.tickets = [ticket, ...this.tickets];
  },

  update(id: string, data: Partial<Ticket>): Ticket | undefined {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    this.tickets[index] = { ...this.tickets[index], ...data, updateAt: new Date().toISOString() };
    return this.tickets[index];
  },
};