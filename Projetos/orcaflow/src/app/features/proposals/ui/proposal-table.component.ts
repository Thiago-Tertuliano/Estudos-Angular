import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { Proposal, PROPOSAL_STATUS_LABELS } from '../data-access/proposal.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-proposal-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule, EmptyStateComponent],
  template: `
    @if (proposals().length === 0) {
      <app-empty-state title="Nenhuma proposta encontrada" message="Crie sua primeira proposta.">
        <a mat-raised-button color="primary" routerLink="/proposals/new">Nova Proposta</a>
      </app-empty-state>
    } @else {
      <table mat-table [dataSource]="proposals()" class="full-width">
        <ng-container matColumnDef="clientName">
          <th mat-header-cell *matHeaderCellDef>Cliente</th>
          <td mat-cell *matCellDef="let p">{{ p.clientName }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let p"><mat-chip [color]="p.status === 'approved' ? 'primary' : p.status === 'rejected' ? 'warn' : ''">{{ PROPOSAL_STATUS_LABELS[p.status] }}</mat-chip></td>
        </ng-container>
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let p">{{ calcTotal(p) | currency:'BRL':'symbol':'1.2-2' }}</td>
        </ng-container>
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>Data</th>
          <td mat-cell *matCellDef="let p">{{ p.createdAt | date:'shortDate' }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let p">
            <a mat-icon-button [routerLink]="['/proposals', p.id, 'edit']" matTooltip="Editar">
              <mat-icon>edit</mat-icon>
            </a>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    }
  `,
  styles: ['.full-width { width: 100%; }'],
})
export class ProposalTableComponent {
  readonly proposals = input.required<Proposal[]>();
  readonly loading = input(false);
  readonly columns = ['clientName', 'status', 'total', 'createdAt', 'actions'];
  readonly PROPOSAL_STATUS_LABELS = PROPOSAL_STATUS_LABELS;

  calcTotal(p: Proposal): number {
    const itemsTotal = p.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    return itemsTotal - (p.discount || 0);
  }
}
