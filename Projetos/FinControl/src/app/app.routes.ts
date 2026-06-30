import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { ShellComponent } from '@core/layout/shell.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@features/auth/pages/login.page').then((m) => m.LoginPage),
    title: 'Login — FinControl',
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage),
        title: 'Dashboard — FinControl',
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('@features/transactions/transactions.routes').then(
            (m) => m.TRANSACTION_ROUTES
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@shared/pages/not-found.page').then((m) => m.NotFoundPage),
  },
];
