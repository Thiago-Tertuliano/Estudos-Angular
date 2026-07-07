import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/sinacor-shell.component').then(
        (m) => m.SinacorShellComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'cadastro-clientes',
        pathMatch: 'full',
      },
      {
        path: 'cadastro-clientes',
        loadChildren: () =>
          import('./features/cadastro-clientes/cadastro-clientes.routes').then(
            (m) => m.CADASTRO_CLIENTES_ROUTES,
          ),
        title: 'Cadastro de Clientes - Sinacor',
      },
    ],
  },
];
