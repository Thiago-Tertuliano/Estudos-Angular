import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Ticket,
  TICKET_PRIORITY_LABELS,
  TICKET_STATUS_LABELS,
} from '../data-access/ticket.model';

@Component({
  selector: 'app-ticket-table',
  standalone: true,
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando...</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Aberto em</th>
            <th>Solicitante</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (ticket of tickets(); track ticket.id) {
            <tr>
              <td>
                <strong>{{ ticket.title }}</strong>
                <span class="desc">{{ ticket.description }}</span>
              </td>
              <td>
                <span class="badge" [class]="ticket.status">
                  {{ statusLabels[ticket.status] }}
                </span>
              </td>
              <td>
                <span class="priority" [class]="ticket.priority">
                  {{ priorityLabels[ticket.priority] }}
                </span>
              </td>
              <td>{{ ticket.createdAt | date: 'dd/MM/yyyy' }}</td>
              <td>{{ ticket.requesterName }}</td>
              <td>
                <a [routerLink]="['/tickets', ticket.id, 'edit']">Editar</a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
      vertical-align: top;
    }

    th {
      color: var(--color-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
    }

    .desc {
      display: block;
      font-size: 0.8125rem;
      color: var(--color-muted);
      margin-top: 0.25rem;
    }

    .badge {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      background: rgba(139, 156, 179, 0.2);
    }

    .badge.open {
      background: rgba(0, 137, 123, 0.2);
      color: #4db6ac;
    }

    .badge.in_progress {
      background: rgba(21, 101, 192, 0.2);
      color: #64b5f6;
    }

    .badge.resolved {
      background: rgba(34, 197, 94, 0.2);
      color: var(--color-success);
    }

    .badge.closed {
      background: rgba(139, 156, 179, 0.2);
      color: var(--color-muted);
    }

    .priority.high,
    .priority.critical {
      color: var(--color-danger);
    }

    .priority.medium {
      color: var(--color-warning);
    }

    .priority.low {
      color: var(--color-muted);
    }
  `,
})
export class TicketTableComponent {
  readonly tickets = input.required<Ticket[]>();
  readonly loading = input(false);

  readonly statusLabels = TICKET_STATUS_LABELS;
  readonly priorityLabels = TICKET_PRIORITY_LABELS;
}
