import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../data-access/product.service';
import { ProductFormComponent } from '../ui/product-form.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [RouterLink, ProductFormComponent, CardComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Editar Produto</h1>
        <a routerLink="/products" class="back-link">Voltar</a>
      </div>
      <app-card headerTitle="Dados do Produto" [padding]="true">
        <app-product-form (saved)="onUpdate($event)" />
      </app-card>
    </div>
  `,
  styles: [`
    .page { max-width: 600px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { margin: 0; font-size: 1.5rem; }
    .back-link { color: #1a1a2e; text-decoration: underline; }
  `],
})
export class ProductFormPage {
  private readonly service = inject(ProductService);
  onUpdate(_data: any) {}
}
