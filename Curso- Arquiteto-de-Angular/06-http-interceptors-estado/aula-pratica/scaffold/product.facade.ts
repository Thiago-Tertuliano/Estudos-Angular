import { Injectable, inject, signal } from '@angular/core';
import { Product } from './product.model';
// TODO: ProductApi

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  // TODO: items, loading, error signals
  // TODO: loadAll() chama API e seta items
  // TODO: create() POST e atualiza items
}
