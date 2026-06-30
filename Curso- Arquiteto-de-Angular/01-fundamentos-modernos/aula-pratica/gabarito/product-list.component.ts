import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent, Product } from './product-card.component';

const MOCK: Product[] = [
  { id: '1', name: 'Notebook', price: 4500 },
  { id: '2', name: 'Mouse', price: 120 },
  { id: '3', name: 'Teclado', price: 280 },
];

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  template: `
    <input
      type="search"
      placeholder="Filtrar por nome..."
      [ngModel]="search()"
      (ngModelChange)="search.set($event)"
    />

    <div class="grid">
      @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" (addToCart)="onAdd($event)" />
      } @empty {
        <p>Nenhum produto encontrado.</p>
      }
    </div>
  `,
  styles: `.grid { display: grid; gap: 1rem; margin-top: 1rem; }`,
})
export class ProductListComponent {
  readonly search = signal('');
  readonly products = signal<Product[]>(MOCK);

  readonly filteredProducts = computed(() => {
    const term = this.search().toLowerCase();
    return this.products().filter((p) => p.name.toLowerCase().includes(term));
  });

  onAdd(id: string): void {
    console.log('Adicionado ao carrinho:', id);
  }
}
