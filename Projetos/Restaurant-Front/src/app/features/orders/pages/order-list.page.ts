
import { OrderListComponent } from "../ui/order-list.component";
import { Component, inject, OnInit } from "@angular/core";
import { OrderFormComponent } from "../ui/order-form.component";
import { OrdersFacade } from "../data-access/orders.facade";
import { CreateOrderPayload } from "../data-access/order.model";


@Component({
  selector: 'app-order-list-page',
  standalone: true,
  imports: [OrderListComponent, OrderFormComponent],
  template: `
  <h1>Orders</h1>

  @if (facade.error()) {
    <p class="error">{{ facade.error() }}</p>
  }

  <app-order-form (saved)="onSave($event)" />

  <app-order-list [items]="facade.items()" [loading]="facade.loading()" />
  `,
})
export class OrderListPage implements OnInit {
  readonly facade = inject(OrdersFacade);

  ngOnInit(): void {
    this.facade.loadAll();
  }

  onSave(payload: CreateOrderPayload): void {
    this.facade.create(payload);
  }
}
