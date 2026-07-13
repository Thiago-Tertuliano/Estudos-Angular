import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../data-access/product.service';
import { ProductTableComponent } from '../ui/product-table.component';
import { ProductFormComponent } from '../ui/product-form.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [ProductTableComponent, ProductFormComponent, CardComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Produtos</h1>
      </div>

      <app-card headerTitle="Novo Produto" [padding]="true">
        <app-product-form (saved)="onCreate($event)" />
      </app-card>

      <app-card headerTitle="Produtos Cadastrados" [padding]="false" style="margin-top:1.5rem">
        @if (service.loading()) {
          <div class="loading">Carregando...</div>
        } @else {
          <app-product-table [products]="service.items()" (delete)="onDelete($event)" />
        }
      </app-card>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; color: #1a1a2e; }
    .loading { text-align: center; padding: 2rem; color: #888; }
  `],
})
export class ProductListPage {
  readonly service = inject(ProductService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  constructor() { this.service.loadAll(); }

  onCreate(data: any) {
    this.service.create(data).subscribe({
      next: (product) => {
        this.service.items.update(list => [...list, product]);
        this.snackBar.open('Produto criado com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: () => this.snackBar.open('Erro ao criar produto', 'Fechar', { duration: 3000 }),
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Excluir produto', message: 'Tem certeza que deseja excluir este produto?', confirmText: 'Excluir', color: 'warn' },
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.service.delete(id).subscribe({
        next: () => {
          this.service.items.update(list => list.filter(p => p.id !== id));
          this.snackBar.open('Produto excluído!', 'Fechar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Erro ao excluir produto', 'Fechar', { duration: 3000 }),
      });
    });
  }
}
