import { Routes } from '@angular/router';

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/transaction-list.page').then((m) => m.TransactionListPage),
    title: 'Transações — FinControl',
  },
];
