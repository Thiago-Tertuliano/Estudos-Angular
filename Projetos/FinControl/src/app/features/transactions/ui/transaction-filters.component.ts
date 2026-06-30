import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionFilters } from '../data-access/transaction.model';

@Component({
  selector: 'app-transaction-filters',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters">
      <input
        type="search"
        placeholder="Buscar..."
        [ngModel]="filters().search"
        (ngModelChange)="emit({ search: $event, type: filters().type })"
      />
      <select
        [ngModel]="filters().type"
        (ngModelChange)="emit({ search: filters().search, type: $event })"
      >
        <option value="all">Todos</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </select>
    </div>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    input, select {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }
    input { flex: 1; }
  `,
})
export class TransactionFiltersComponent {
  readonly filters = input.required<TransactionFilters>();
  readonly filtersChange = output<TransactionFilters>();

  emit(value: TransactionFilters): void {
    this.filtersChange.emit({ ...value });
  }
}
