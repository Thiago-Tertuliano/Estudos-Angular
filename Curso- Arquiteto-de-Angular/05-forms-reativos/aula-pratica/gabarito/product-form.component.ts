import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../data-access/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="name" placeholder="Nome" />
      <input formControlName="price" type="number" step="0.01" placeholder="Preço" />
      <button type="submit" [disabled]="form.invalid">Adicionar</button>
    </form>
  `,
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly saved = output<Omit<Product, 'id'>>();

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.getRawValue());
    this.form.reset({ name: '', price: 0 });
  }
}
