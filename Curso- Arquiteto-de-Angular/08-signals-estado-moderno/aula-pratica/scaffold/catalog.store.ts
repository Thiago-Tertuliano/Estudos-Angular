import { Injectable, computed, inject } from '@angular/core';
import { ProductFacade } from './product.facade';

@Injectable({ providedIn: 'root' })
export class CatalogStore {
  // TODO: inject ProductFacade
  // TODO: totalValue = computed(() => soma prices)
  // TODO: cheapest = computed(() => menor price)
}
