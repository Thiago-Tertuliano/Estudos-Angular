import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gestao-titulos',
    pathMatch: 'full',
  },
  {
    path: 'gestao-titulos',
    loadChildren: () =>
      import('./features/gestao-titulos/gestao-titulos.routes').then(
        (m) => m.GESTAO_TITULOS_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: 'gestao-titulos',
  },
];
