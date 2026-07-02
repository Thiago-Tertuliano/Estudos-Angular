import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Order } from "../data-access/order.model";


@Component({
  selector: 'app-order-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando pedidos...</p>
    } @else if (!items().length) {
      <p>Nenhum pedido encontrado.</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mesa</th>
            <th>Garçom</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.tableId }}</td>
              <td>{{ item.waiterId }}</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #ddd; }
  th { font-size: 0.75rem; text-transform: uppercase; color: #666; }
  `,
})
export class OrderListComponent {
  readonly items = input.required<Order[]>();
  readonly loading = input(false);
}
