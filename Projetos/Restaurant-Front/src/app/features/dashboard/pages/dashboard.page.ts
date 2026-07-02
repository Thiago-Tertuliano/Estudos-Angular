import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardStore } from '../data-access/dashboard.store';
import { SummaryCardComponent } from '../ui/summary-card.component';
import { OrdersFacade } from '@features/orders/data-access/orders.facade';
import { TablesFacade } from '@features/tables/data-access/tables.facade';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SummaryCardComponent, RouterLink],
  template: `
    <h1>Dashboard</h1>
    <p>Sprint 9 — KPIs do restaurante</p>

    @if (loading()) {
      <p>Carregando indicadores...</p>
    } @else {
      <div class="grid">
        <app-summary-card label="Pedidos abertos" [value]="store.openOrders()" />
        <app-summary-card label="Mesas ocupadas" [value]="store.occupiedTables()" />
        <app-summary-card label="Total de pedidos" [value]="store.totalOrders()" />
        <app-summary-card
          label="Faturamento (finalizados)"
          [value]="store.finishedRevenue()"
          format="currency"
        />
      </div>

      <p class="links">
        <a routerLink="/orders">Ver pedidos</a> ·
        <a routerLink="/">Ver mesas</a>
      </p>
    }
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .links a {
      margin-right: 0.5rem;
    }
  `,
})
export class DashboardPage implements OnInit {
  readonly store = inject(DashboardStore);
  private readonly orders = inject(OrdersFacade);
  private readonly tables = inject(TablesFacade);

  loading = () => this.orders.loading() || this.tables.loading();

  ngOnInit(): void {
    this.store.load();
  }
}
