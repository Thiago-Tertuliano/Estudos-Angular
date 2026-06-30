import { Injectable, computed, inject } from '@angular/core';
import { ProductFacade } from './product.facade';

@Injectable({ providedIn: 'root' })
export class CatalogStore {
  private readonly facade = inject(ProductFacade);

  readonly products = this.facade.items;

  readonly totalValue = computed(() =>
    this.products().reduce((sum, p) => sum + p.price, 0)
  );

  readonly cheapest = computed(() => {
    const list = this.products();
    if (!list.length) return null;
    return list.reduce((min, p) => (p.price < min.price ? p : min));
  });
}
