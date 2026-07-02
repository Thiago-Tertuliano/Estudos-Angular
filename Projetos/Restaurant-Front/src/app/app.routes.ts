import { Routes } from "@angular/router";
import { guestGuard } from "@core/guards/guest.guard";
import { ShellComponent } from "@core/layout/shell.component";
import { authGuard } from "@core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login.page').then((m) => m.LoginPage),
    title: 'Login - Restaurant Front',
  },
  {
    path: '',
    canActivate: [authGuard],
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage),
        title: 'Dashboard - Restaurant Front',
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home.page').then((m) => m.HomePage),
        title: 'Home - Restaurant Front',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/pages/about.page').then((m) => m.AboutPage),
        title: 'About - Restaurant Front',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/pages/order-list.page').then((m) => m.OrderListPage),
        title: 'Orders - Restaurant Front',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
