import { Routes } from "@angular/router";

export const CADASTRO_CLIENTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@containers/cadastro-clientes-container/cadastro-clientes.component').then((m) => m.CadastroClientesContainerComponent),
    title: 'Cadastro de Clientes - Sinacor',
    data: { accessFunction: 'CADASTRO_CLIENTES'},
  },
];
