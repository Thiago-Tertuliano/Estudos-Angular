import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateOrderPayload } from '../data-access/order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Mesa (id)
        <input formControlName="tableId" placeholder="ex: 1" />
      </label>
      <label>
        Garçom (id)
        <input formControlName="waiterId" placeholder="ex: 1" />
      </label>
      <button type="submit" [disabled]="form.invalid">Criar pedido</button>
    </form>
  `,
})
export class OrderFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly saved = output<CreateOrderPayload>();

  readonly form = this.fb.nonNullable.group({
    tableId: ['', Validators.required],
    waiterId: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saved.emit(this.form.getRawValue());
    this.form.reset();
  }
}
