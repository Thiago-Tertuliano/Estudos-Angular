/**
 * SCAFFOLD — Módulo 01, Exercício 3
 * Copie para: angular-lab/src/app/features/playground/ui/product-list.component.ts
 * Referência HTML: ../../exemplos/user-list.component.html
 */
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
// TODO: import { ProductCardComponent, Product } from './product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    // TODO: ProductCardComponent
  ],
  template: `
    <input
      type="search"
      placeholder="Filtrar por nome..."
      [ngModel]="search()"
      (ngModelChange)="search.set($event)"
    />

    <!-- TODO: @for (product of filteredProducts(); track product.id) -->
    <!--   <app-product-card [product]="product" (addToCart)="onAdd($event)" /> -->
    <!-- @empty { <p>Nenhum produto encontrado.</p> } -->
  `,
})
export class ProductListComponent {
  // TODO: readonly search = signal('');
  // TODO: readonly products = signal<Product[]>([...MOCK de 3 produtos]);

  // TODO: readonly filteredProducts = computed(() => ...filtrar por search);

  onAdd(id: string): void {
    console.log('Adicionado ao carrinho:', id);
  }
}
