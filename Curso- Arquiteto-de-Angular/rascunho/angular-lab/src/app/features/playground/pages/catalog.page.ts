import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { LoggerService } from '@core/services/logger.service';
import { ProductApi } from '../data-access/product.api';
import { ProductFacade } from '../data-access/product.facade';
import { Product } from '../data-access/product.model';
import { CatalogFiltersComponent } from '../ui/catalog-filters.component';
import { ProductFormComponent } from '../ui/product-form.component';
import { ProductGridComponent } from '../ui/product-grid.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CatalogFiltersComponent, ProductGridComponent, ProductFormComponent],
  template: `
    <h2>Catálogo</h2>

    @if (facade.loading()) {
      <p>Carregando produtos...</p>
    }

    @if (facade.error(); as errorMessage) {
      <p class="error">{{ errorMessage }}</p>
    }

    <app-catalog-filters [search]="search()" (searchChange)="search.set($event)" />
    <app-product-grid [products]="filteredProducts()" (addToCart)="onAdd($event)" />
    <app-product-form (saved)="onProductSaved($event)" />
  `,
})
export class CatalogPage implements OnInit {
  private readonly logger = inject(LoggerService);
  private readonly productApi = inject(ProductApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly facade = inject(ProductFacade);

  readonly search = signal('');
  private readonly remoteResults = signal<Product[] | null>(null);

  readonly filteredProducts = computed(() => {
    const term = this.search().toLowerCase();
    const remote = this.remoteResults();

    if (term.length >= 2 && remote) {
      return remote;
    }

    return this.facade.items().filter((product) => product.name.toLowerCase().includes(term));
  });

  constructor() {
    toObservable(this.search)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => (term.length >= 2 ? this.productApi.search(term) : of(null))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((results) => this.remoteResults.set(results));
  }

  ngOnInit(): void {
    this.facade.loadAll();
  }

  onAdd(id: string): void {
    this.logger.log(`Produto ${id} adicionado`);
  }

  onProductSaved(product: Omit<Product, 'id'>): void {
    this.facade.create(product);
  }
}
