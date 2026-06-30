import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../data-access/transaction.model';

export interface TransactionFormValue {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  date: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="tx-form">
      <input formControlName="description" placeholder="Descrição" />
      <input type="number" formControlName="amount" placeholder="Valor" step="0.01" />
      <select formControlName="type">
        <option value="expense">Despesa</option>
        <option value="income">Receita</option>
      </select>
      <select formControlName="categoryId">
        <option value="">Categoria</option>
        @for (cat of categories(); track cat.id) {
          <option [value]="cat.id">{{ cat.name }}</option>
        }
      </select>
      <input type="date" formControlName="date" />
      <button type="submit" [disabled]="form.invalid || submitting()">Adicionar</button>
    </form>
  `,
  styles: `
    .tx-form {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    input, select, button {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
    }
    button {
      background: var(--color-primary);
      color: white;
      border: none;
      font-weight: 600;
      &:disabled { opacity: 0.5; }
    }
    @media (max-width: 900px) {
      .tx-form { grid-template-columns: 1fr; }
    }
  `,
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly categories = input.required<Category[]>();
  readonly submitting = input(false);
  readonly saved = output<TransactionFormValue>();

  readonly form = this.fb.nonNullable.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['expense' as const, Validators.required],
    categoryId: ['', Validators.required],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.getRawValue());
    this.form.patchValue({ description: '', amount: 0 });
  }
}
