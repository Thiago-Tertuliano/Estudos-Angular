import { inject, Injectable, signal } from "@angular/core";
import { OrdersApi } from "./orders.api";
import { CreateOrderPayload, Order } from "./order.model";
import { finalize, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrdersFacade {
  private readonly api = inject(OrdersApi);

  readonly items = signal<Order[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.getAll().pipe(
      tap((data) => this.items.set(data)),
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      error: () => this.error.set('Falha ao carregar pedidos'),
    });
  }
  create(payload: CreateOrderPayload): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.create(payload).pipe(
      tap((created) => this.items.update((list) => [created, ...list])),
      finalize(() => this.loading.set(false))
    ).subscribe({
      error: () => this.error.set('Falha ao criar pedido'),
    });
  }
}
