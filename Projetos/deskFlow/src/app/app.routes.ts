import { Routes } from '@angular/router';
import { guestGuard, authGuard } from './core/guards/auth.guard';
import { ShellComponent } from './core/layouts/shell.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login.page').then((m) => m.LoginPage),
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
          import('./features/dashboard/pages/dashboard.page').then(
            (m) => m.DashboardPage,
          ),
      },
      {
        path: 'tickets/new',
        loadComponent: () =>
          import('./features/tickets/ui/ticket-form-page.component').then((m) => m.TicketFormPage,
        ),
        title: 'Novo ticket - DeskFlow',
      },
      {
        path: 'tickets/:id/edit',
        loadComponent: () =>
          import('./features/tickets/ui/ticket-form-page.component').then((m) => m.TicketFormPage,
        ),
        title: 'Editar ticket - DeskFlow'
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/tickets/pages/ticket-list.page').then((m) => m.TicketListPage,
          ),
        title: 'Tickets - DeskFlow',  
      }
    ],
  },
  
];
