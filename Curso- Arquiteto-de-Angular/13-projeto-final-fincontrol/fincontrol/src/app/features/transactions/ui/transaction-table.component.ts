import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../data-access/transaction.model';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando...</p>
    } @else if (!transactions().length) {
      <app-empty-state
        title="Nenhuma transação"
        message="Adicione sua primeira transação usando o formulário acima."
      />
    } @else {
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (tx of transactions(); track tx.id) {
            <tr [class.expense]="tx.type === 'expense'">
              <td>{{ tx.description }}</td>
              <td>{{ tx.amount | currency: 'BRL' }}</td>
              <td>{{ tx.date | date: 'dd/MM/yyyy' }}</td>
              <td>
                <button type="button" class="danger" (click)="delete.emit(tx.id)">
                  Excluir
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border); }
    th { color: var(--color-muted); font-size: 0.75rem; text-transform: uppercase; }
    .expense td:nth-child(2) { color: var(--color-expense); }
    tr:not(.expense) td:nth-child(2) { color: var(--color-income); }
    .danger {
      background: transparent;
      border: 1px solid var(--color-expense);
      color: var(--color-expense);
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.75rem;
    }
  `,
})
export class TransactionTableComponent {
  readonly transactions = input.required<Transaction[]>();
  readonly loading = input(false);
  readonly delete = output<string>();
}
