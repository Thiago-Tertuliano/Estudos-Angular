import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
// TODO: import Product, ProductCardComponent

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    // TODO: ProductCardComponent
  ],
  // TODO: OnPush
  template: `
    <!-- TODO: @for products + @empty + app-product-card -->
  `,
})
export class ProductGridComponent {
  // TODO: products input.required, addToCart output
}
