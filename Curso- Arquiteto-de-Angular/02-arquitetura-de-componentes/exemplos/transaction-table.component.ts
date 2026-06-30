import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

export interface TransactionRow {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

/**
 * DUMB / PRESENTATIONAL — só renderiza o que recebe, emite ações.
 * OnPush: performance + contrato claro de inputs.
 */
@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p>Carregando transações...</p>
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
                <button type="button" (click)="delete.emit(tx.id)">Excluir</button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="4">Nenhuma transação.</td></tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `.expense { color: #c0392b; }`,
})
export class TransactionTableComponent {
  readonly transactions = input.required<TransactionRow[]>();
  readonly loading = input(false);
  readonly delete = output<string>();
}
