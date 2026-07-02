import { computed, inject, Injectable } from "@angular/core";
import { OrdersFacade } from "@features/orders/data-access/orders.facade";
import { TablesFacade } from "@features/tables/data-access/tables.facade";

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly orders = inject(OrdersFacade)
  private readonly tables = inject(TablesFacade)

  readonly openOrders = computed(() => this.orders.items().filter((o) => o.status === 'Open').length);

  readonly occupiedTables = computed(() => this.tables.items().filter((t) => t.status === 'Occupied').length);

  readonly totalOrders = computed(() => this.orders.items().length);

  readonly finishedRevenue = computed(() =>
    this.orders
      .items()
      .filter((o) => o.status === 'Finish')
      .reduce((sum, o) => sum + o.totalPrice, 0)
  );

  load(): void {
    this.orders.loadAll();
    this.tables.loadAll();
  }
}
