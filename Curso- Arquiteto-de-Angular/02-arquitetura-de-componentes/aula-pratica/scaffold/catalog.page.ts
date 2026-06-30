import { Component, computed, signal } from '@angular/core';
// TODO: imports Product, CatalogFiltersComponent, ProductGridComponent

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    // TODO
  ],
  template: `
    <h2>Catálogo</h2>
    <!-- TODO: app-catalog-filters [search] (searchChange) -->
    <!-- TODO: app-product-grid [products] (addToCart) -->
  `,
})
export class CatalogPage {
  // TODO: search signal, products signal (MOCK 3 itens), filteredProducts computed
  // TODO: onAdd(id: string)
}
