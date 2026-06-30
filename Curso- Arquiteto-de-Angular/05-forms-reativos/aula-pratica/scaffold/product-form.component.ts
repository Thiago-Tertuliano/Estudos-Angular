import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// TODO: Product type, saved output

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<!-- TODO: form name + price -->`,
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  // TODO: form + submit
}
