import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../data-access/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency: 'BRL' }}</p>
      <button type="button" (click)="addToCart.emit(product().id)">Adicionar</button>
    </article>
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToCart = output<string>();
}
