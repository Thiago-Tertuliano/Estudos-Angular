import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../data-access/client.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule, MatIconModule, EmptyStateComponent, CnpjPipe],
  template: `
    @if (clients().length === 0) {
      <app-empty-state title="Nenhum cliente encontrado" message="Cadastre seu primeiro cliente." />
    } @else {
      <table mat-table [dataSource]="clients()" class="full-width">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let c">{{ c.name }}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>E-mail</th>
          <td mat-cell *matCellDef="let c">{{ c.email }}</td>
        </ng-container>
        <ng-container matColumnDef="document">
          <th mat-header-cell *matHeaderCellDef>Doc.</th>
          <td mat-cell *matCellDef="let c">{{ c.document | cnpj }}</td>
        </ng-container>
        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef>Telefone</th>
          <td mat-cell *matCellDef="let c">{{ c.phone }}</td>
        </ng-container>
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>Cadastro</th>
          <td mat-cell *matCellDef="let c">{{ c.createdAt | date:'shortDate' }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    }
  `,
  styles: ['.full-width { width: 100%; }'],
})
export class ClientTableComponent {
  readonly clients = input.required<Client[]>();
  readonly columns = ['name', 'email', 'document', 'phone', 'createdAt'];
}
