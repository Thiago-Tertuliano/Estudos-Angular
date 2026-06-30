import { Component, inject, signal, computed } from '@angular/core';
import { TransactionService } from './transaction.service';
import { TransactionTableComponent } from './transaction-table.component';
import { TransactionFiltersComponent, TransactionFilters } from './transaction-filters.component';

/**
 * SMART CONTAINER — conhece o service, gerencia estado, delega UI.
 */
@Component({
  selector: 'app-transaction-list-page',
  standalone: true,
  imports: [TransactionTableComponent, TransactionFiltersComponent],
  template: `
    <app-transaction-filters
      [filters]="filters()"
      (filtersChange)="onFiltersChange($event)"
    />
    <app-transaction-table
      [transactions]="filteredTransactions()"
      [loading]="loading()"
      (delete)="onDelete($event)"
    />
  `,
})
export class TransactionListPage {
  private readonly transactionService = inject(TransactionService);

  readonly loading = signal(false);
  readonly transactions = signal<Transaction[]>([]);
  readonly filters = signal<TransactionFilters>({ search: '', type: 'all' });

  readonly filteredTransactions = computed(() => {
    const { search, type } = this.filters();
    return this.transactions().filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchType = type === 'all' || t.type === type;
      return matchSearch && matchType;
    });
  });

  constructor() {
    this.loadTransactions();
  }

  onFiltersChange(filters: TransactionFilters): void {
    this.filters.set(filters);
  }

  onDelete(id: string): void {
    this.transactionService.delete(id).subscribe(() => this.loadTransactions());
  }

  private loadTransactions(): void {
    this.loading.set(true);
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

// Stub para compilação do exemplo — implemente no data-access
class TransactionService {
  getAll() { return { subscribe: (_: unknown) => void 0 } as never; }
  delete(_id: string) { return { subscribe: (_: unknown) => void 0 } as never; }
}
