import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Titulo } from '../../models/titulo.model';

@Component({
  selector: 'app-titulos-table-presenter',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table mat-table [dataSource]="titulos()" class="mat-elevation-z2">
      <ng-container matColumnDef="nomeCliente">
        <th mat-header-cell *matHeaderCellDef>Nome Cliente</th>
        <td mat-cell *matCellDef="let row">{{ row.nomeCliente }}</td>
      </ng-container>

      <ng-container matColumnDef="conta">
        <th mat-header-cell *matHeaderCellDef>Conta</th>
        <td mat-cell *matCellDef="let row">{{ row.conta }}</td>
      </ng-container>

      <ng-container matColumnDef="cpf">
        <th mat-header-cell *matHeaderCellDef>CPF</th>
        <td mat-cell *matCellDef="let row">{{ row.cpf }}</td>
      </ng-container>

      <ng-container matColumnDef="dataCompra">
        <th mat-header-cell *matHeaderCellDef>Data da Compra</th>
        <td mat-cell *matCellDef="let row">{{ row.dataCompra | date: 'dd/MM/yyyy' }}</td>
      </ng-container>

      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef>Ações</th>
        <td mat-cell *matCellDef="let row">
          <button mat-button color="primary" type="button" (click)="editTitulo.emit(row)">
            Editar
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    @if (!titulos().length) {
      <p class="empty">Nenhum título encontrado.</p>
    }
  `,
  styles: `
    table {
      width: 100%;
    }
    .empty {
      margin-top: 1rem;
      color: #666;
    }
  `,
})
export class TitulosTablePresenterComponent {
  readonly titulos = input.required<Titulo[]>();
  readonly editTitulo = output<Titulo>();

  readonly displayedColumns = ['nomeCliente', 'conta', 'cpf', 'dataCompra', 'acoes'];
}
