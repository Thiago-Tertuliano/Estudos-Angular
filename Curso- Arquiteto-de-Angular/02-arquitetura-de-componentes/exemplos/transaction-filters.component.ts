import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TransactionFilters {
  search: string;
  type: 'all' | 'income' | 'expense';
}

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
        (ngModelChange)="emitChange({ search: $event, type: filters().type })"
      />
      <select
        [ngModel]="filters().type"
        (ngModelChange)="emitChange({ search: filters().search, type: $event })"
      >
        <option value="all">Todos</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </select>
    </div>
  `,
})
export class TransactionFiltersComponent {
  readonly filters = input.required<TransactionFilters>();
  readonly filtersChange = output<TransactionFilters>();

  emitChange(partial: TransactionFilters): void {
    // Emite objeto NOVO — imutabilidade para OnPush funcionar
    this.filtersChange.emit({ ...partial });
  }
}
