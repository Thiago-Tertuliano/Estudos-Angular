import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.page').then((m) => m.LoginPage),
    title: 'Login — FinControl',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage),
    title: 'Dashboard — FinControl',
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/transactions/transactions.routes').then((m) => m.TRANSACTION_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/not-found.page').then((m) => m.NotFoundPage),
  },
];
