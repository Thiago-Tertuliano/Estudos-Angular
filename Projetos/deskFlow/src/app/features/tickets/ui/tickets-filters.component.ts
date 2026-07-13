import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketFilters } from '../data-access/ticket.model';

@Component({
  selector: 'app-ticket-filters',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters">
      <input
        type="search"
        placeholder="Buscar por título ou solicitante..."
        [ngModel]="filters().search"
        (ngModelChange)="
          emit({
            search: $event,
            status: filters().status,
            priority: filters().priority,
          })
        "
      />

      <select
        [ngModel]="filters().status"
        (ngModelChange)="
          emit({
            search: filters().search,
            status: $event,
            priority: filters().priority,
          })
        "
      >
        <option value="all">Todos os status</option>
        <option value="open">Aberto</option>
        <option value="in_progress">Em andamento</option>
        <option value="resolved">Resolvido</option>
        <option value="closed">Fechado</option>
      </select>

      <select
        [ngModel]="filters().priority"
        (ngModelChange)="
          emit({
            search: filters().search,
            status: filters().status,
            priority: $event,
          })
        "
      >
        <option value="all">Todas as prioridades</option>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
        <option value="critical">Crítica</option>
      </select>
    </div>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    input,
    select {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }

    input {
      flex: 1;
      min-width: 12rem;
    }
  `,
})
export class TicketFiltersComponent {
  readonly filters = input.required<TicketFilters>();
  readonly filtersChange = output<TicketFilters>();

  emit(value: TicketFilters): void {
    this.filtersChange.emit({ ...value });
  }
}
