import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Table } from "../data-access/table.model";

@Component({
  selector: 'app-table-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando mesas...</p>
    } @else if (!tables().length) {
      <p>Nenhuma mesa encontrada.</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Capacidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          @for (table of tables(); track table.id) {
            <tr>
              <td>{{ table.number }}</td>
              <td>{{ table.capacity }} lugares</td>
              <td>
                <span [class]="'badge badge--' + table.status.toLowerCase()">{{ table.status }}</span>
              </td>
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
  .badge { padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.85rem; }
  .badge--available { background: #e8f5e9; color: #2e7d32; }
  .badge--occupied { background: #ffebee; color: #c62828; }
  .badge--reserved { background: #fff8e1; color: #f57f17; }
`,
})
export class TableListComponent {
  readonly tables = input.required<Table[]>();
  readonly loading = input(false);
}
