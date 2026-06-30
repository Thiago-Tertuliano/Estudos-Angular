import { Injectable, computed, signal } from '@angular/core';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
}

/**
 * Store leve com signals — alternativa a NgRx para apps médias.
 * Para apps gigantes, considere NgRx SignalStore ou Elf.
 */
@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly transactions = signal<Transaction[]>([]);
  readonly period = signal<'month' | 'year'>('month');

  readonly income = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly expenses = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly balance = computed(() => this.income() - this.expenses());

  readonly summaryLabel = computed(() =>
    this.period() === 'month' ? 'Resumo do mês' : 'Resumo do ano'
  );

  setTransactions(data: Transaction[]): void {
    this.transactions.set(data);
  }

  setPeriod(period: 'month' | 'year'): void {
    this.period.set(period);
  }
}
