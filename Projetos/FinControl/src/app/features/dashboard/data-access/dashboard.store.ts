import { Injectable, computed, inject, signal } from '@angular/core';
import { TransactionFacade } from '@features/transactions/data-access/transaction.facade';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly facade = inject(TransactionFacade);

  readonly period = signal<'month' | 'year'>('month');

  readonly transactions = this.facade.items;

  readonly income = computed(() =>
    this.sumByType('income')
  );

  readonly expenses = computed(() =>
    this.sumByType('expense')
  );

  readonly balance = computed(() => this.income() - this.expenses());

  readonly transactionCount = computed(() => this.transactions().length);

  load(): void {
    this.facade.loadAll();
  }

  private sumByType(type: 'income' | 'expense'): number {
    return this.transactions()
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  }
}
