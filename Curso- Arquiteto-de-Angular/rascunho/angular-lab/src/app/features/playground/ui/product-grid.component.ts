import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../data-access/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" (addToCart)="addToCart.emit($event)" />
      } @empty {
        <p>Nenhum produto encontrado.</p>
      }
    </div>
  `,
  styles: `.grid { display: grid; gap: 1rem; }`,
})
export class ProductGridComponent {
  readonly products = input.required<Product[]>();
  readonly addToCart = output<string>();
}
