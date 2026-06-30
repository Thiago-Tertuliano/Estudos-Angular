import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TransactionFacade } from '../data-access/transaction.facade';
import { TransactionFilters } from '../data-access/transaction.model';
import { TransactionFiltersComponent } from '../ui/transaction-filters.component';
import { TransactionTableComponent } from '../ui/transaction-table.component';
import { TransactionFormComponent, TransactionFormValue } from '../ui/transaction-form.component';

@Component({
  selector: 'app-transaction-list-page',
  standalone: true,
  imports: [
    TransactionFiltersComponent,
    TransactionTableComponent,
    TransactionFormComponent,
  ],
  templateUrl: './transaction-list.page.html',
})
export class TransactionListPage implements OnInit {
  private readonly facade = inject(TransactionFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly categories = this.facade.categories;
  readonly filters = signal<TransactionFilters>({ search: '', type: 'all' });

  readonly filteredTransactions = computed(() => {
    const { search, type } = this.filters();
    return this.facade.items().filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchType = type === 'all' || t.type === type;
      return matchSearch && matchType;
    });
  });

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.loadCategories();
  }

  onFiltersChange(filters: TransactionFilters): void {
    this.filters.set(filters);
  }

  onSave(value: TransactionFormValue): void {
    this.facade.create(value);
  }

  onDelete(id: string): void {
    this.facade.delete(id);
  }
}
