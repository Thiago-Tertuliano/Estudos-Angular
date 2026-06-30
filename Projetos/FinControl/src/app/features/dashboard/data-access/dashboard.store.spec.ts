import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DashboardStore } from './dashboard.store';
import { TransactionFacade } from '@features/transactions/data-access/transaction.facade';

describe('DashboardStore', () => {
  it('deve calcular income, expenses e balance', () => {
    const items = signal([
      {
        id: '1',
        description: 'Salário',
        amount: 1000,
        type: 'income' as const,
        categoryId: 'c1',
        date: '2026-01-01',
      },
      {
        id: '2',
        description: 'Mercado',
        amount: 300,
        type: 'expense' as const,
        categoryId: 'c2',
        date: '2026-01-02',
      },
    ]);

    TestBed.configureTestingModule({
      providers: [
        DashboardStore,
        { provide: TransactionFacade, useValue: { items } },
      ],
    });

    const store = TestBed.inject(DashboardStore);
    expect(store.income()).toBe(1000);
    expect(store.expenses()).toBe(300);
    expect(store.balance()).toBe(700);
  });
});
