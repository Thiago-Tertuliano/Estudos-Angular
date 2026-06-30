import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxAmount } from './custom-validators';

export interface TransactionFormValue {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>
        Descrição
        <input formControlName="description" />
        @if (form.controls.description.touched && form.controls.description.hasError('required')) {
          <span class="error">Descrição obrigatória</span>
        }
      </label>

      <label>
        Valor
        <input type="number" formControlName="amount" step="0.01" />
        @if (form.controls.amount.hasError('maxAmount')) {
          <span class="error">Valor acima do limite</span>
        }
      </label>

      <label>
        Tipo
        <select formControlName="type">
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </label>

      <label>
        Categoria
        <input formControlName="categoryId" />
      </label>

      <button type="submit" [disabled]="form.invalid || form.pending">
        Salvar
      </button>
    </form>
  `,
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly saved = output<TransactionFormValue>();

  readonly form = this.fb.nonNullable.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01), maxAmount(50_000)]],
    type: ['expense' as const, Validators.required],
    categoryId: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.getRawValue());
  }
}
