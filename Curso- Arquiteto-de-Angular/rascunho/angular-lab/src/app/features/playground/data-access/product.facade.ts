import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { ProductApi } from './product.api';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly api = inject(ProductApi);

  readonly items = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAll().subscribe({
      next: (products) => this.items.set(products),
      error: (err) => this.handleError(err),
      complete: () => this.loading.set(false),
    });
  }

  create(product: Omit<Product, 'id'>): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.create(product).subscribe({
      next: (created) => this.items.update((items) => [created, ...items]),
      error: (err) => this.handleError(err),
      complete: () => this.loading.set(false),
    });
  }

  delete(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.delete(id).subscribe({
      next: () => this.items.update((items) => items.filter((item) => item.id !== id)),
      error: (err) => this.handleError(err),
      complete: () => this.loading.set(false),
    });
  }

  update(id: string, product: Product): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.update(id, product).subscribe({
      next: (updated) =>
        this.items.update((items) => items.map((item) => (item.id === id ? updated : item))),
      error: (err) => this.handleError(err),
      complete: () => this.loading.set(false),
    });
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  private handleError(error: { message?: string }): void {
    this.error.set(error.message ?? 'Erro inesperado');
    this.loading.set(false);
  }
}
