import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../data-access/product.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule, EmptyStateComponent],
  template: `
    @if (products().length === 0 && !loading()) {
      <app-empty-state title="Nenhum produto encontrado" message="Cadastre seu primeiro produto." />
    } @else {
      <table mat-table [dataSource]="products()" class="full-width">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let p">{{ p.name }}</td>
        </ng-container>
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Categoria</th>
          <td mat-cell *matCellDef="let p"><mat-chip>{{ p.category }}</mat-chip></td>
        </ng-container>
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Preço</th>
          <td mat-cell *matCellDef="let p">{{ p.price | currency:'BRL':'symbol':'1.2-2' }}</td>
        </ng-container>
        <ng-container matColumnDef="active">
          <th mat-header-cell *matHeaderCellDef>Ativo</th>
          <td mat-cell *matCellDef="let p">{{ p.active ? 'Sim' : 'Não' }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let p">
            <button mat-icon-button color="warn" (click)="delete.emit(p.id)" matTooltip="Excluir">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    }
  `,
  styles: ['.full-width { width: 100%; }'],
})
export class ProductTableComponent {
  readonly products = input.required<Product[]>();
  readonly loading = input(false);
  readonly delete = output<number>();
  readonly columns = ['name', 'category', 'price', 'active', 'actions'];
}
