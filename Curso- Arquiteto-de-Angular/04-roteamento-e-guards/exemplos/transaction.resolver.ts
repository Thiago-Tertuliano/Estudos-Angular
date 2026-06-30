import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TransactionService } from './transaction.service';

export interface TransactionDetail {
  id: string;
  description: string;
  amount: number;
}

export const transactionResolver: ResolveFn<TransactionDetail> = (route) => {
  const service = inject(TransactionService);
  const id = route.paramMap.get('id')!;

  // Componente só renderiza quando dados estão prontos
  return service.getById(id);
};
