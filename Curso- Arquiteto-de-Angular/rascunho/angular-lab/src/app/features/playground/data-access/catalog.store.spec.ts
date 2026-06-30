import { TestBed } from '@angular/core/testing';
import { CatalogStore } from './catalog.store';
import { ProductFacade } from './product.facade';
import { signal } from '@angular/core';

describe('CatalogStore', () => {
  it('deve calcular totalValue e cheapest', () => {
    const items = signal([
      { id: '1', name: 'Mouse', price: 100 },
      { id: '2', name: 'Teclado', price: 200 },
    ]);

    TestBed.configureTestingModule({
      providers: [
        CatalogStore,
        {
          provide: ProductFacade,
          useValue: { items },
        },
      ],
    });

    const store = TestBed.inject(CatalogStore);
    expect(store.totalValue()).toBe(300);
    expect(store.cheapest()?.name).toBe('Mouse');
  });
});
