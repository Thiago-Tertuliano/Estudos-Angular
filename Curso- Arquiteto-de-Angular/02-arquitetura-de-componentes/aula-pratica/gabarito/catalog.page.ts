import { Component, computed, signal } from '@angular/core';
import { Product } from '../data-access/product.model';
import { CatalogFiltersComponent } from '../ui/catalog-filters.component';
import { ProductGridComponent } from '../ui/product-grid.component';

const MOCK: Product[] = [
  { id: '1', name: 'Pc Gamer', price: 1000 },
  { id: '2', name: 'Mouse', price: 100 },
  { id: '3', name: 'Teclado', price: 100 },
];

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CatalogFiltersComponent, ProductGridComponent],
  template: `
    <h2>Catálogo</h2>
    <app-catalog-filters [search]="search()" (searchChange)="search.set($event)" />
    <app-product-grid [products]="filteredProducts()" (addToCart)="onAdd($event)" />
  `,
})
export class CatalogPage {
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
