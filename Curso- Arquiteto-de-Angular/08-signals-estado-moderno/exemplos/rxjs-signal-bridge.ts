import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { DashboardStore } from './dashboard.store';
import { TransactionApi } from './transaction.api';

@Component({
  selector: 'app-dashboard-bridge-example',
  standalone: true,
  template: `
    <p>Saldo: {{ balance() | currency: 'BRL' }}</p>
  `,
})
export class DashboardBridgeExample {
  private readonly store = inject(DashboardStore);
  private readonly api = inject(TransactionApi);

  // Signal → Observable → HTTP → Signal (reativo ao period)
  private readonly transactions = toSignal(
    toObservable(this.store.period).pipe(
      switchMap((period) => this.api.getByPeriod(period))
    ),
    { initialValue: [] }
  );

  readonly balance = this.store.balance;

  constructor() {
    // Sync API result into store quando transactions mudar
    // Em produção: use effect() ou resolver no smart component
  }
}

// Stub
class TransactionApi {
  getByPeriod(_period: string) {
    return { pipe: () => ({ subscribe: () => void 0 }) } as never;
  }
}
