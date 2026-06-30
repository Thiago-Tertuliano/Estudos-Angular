import { Injectable, computed, inject } from '@angular/core';
import { ProductFacade } from './product.facade';

@Injectable({ providedIn: 'root' })
export class CatalogStore {
  private readonly facade = inject(ProductFacade);

  readonly products = computed(() => this.facade.items());

  readonly totalValue = computed(() =>
    this.products().reduce((sum, product) => sum + product.price, 0),
  );

  readonly cheapest = computed(() => {
    const items = this.products();
    if (!items.length) {
      return null;
    }
    return items.reduce((min, product) => (product.price < min.price ? product : min));
  });
}
