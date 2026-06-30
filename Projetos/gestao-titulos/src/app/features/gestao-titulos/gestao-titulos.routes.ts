import { Routes } from '@angular/router';
import { GestaoTitulosContainerComponent } from './containers/gestao-titulos-container/gestao-titulos-container.component';

export const GESTAO_TITULOS_ROUTES: Routes = [
  {
    path: '',
    component: GestaoTitulosContainerComponent,
    data: { accessFunction: 'GESTAO_TITULOS' },
  },
];
