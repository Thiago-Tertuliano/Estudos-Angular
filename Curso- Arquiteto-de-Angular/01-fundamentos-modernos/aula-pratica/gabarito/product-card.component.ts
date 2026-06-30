/** GABARITO — ../../exemplos/product-card.component.ts */
import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <article class="card">
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency: 'BRL' }}</p>
      <button type="button" (click)="addToCart.emit(product().id)">Adicionar</button>
    </article>
  `,
  styles: `
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToCart = output<string>();
}
