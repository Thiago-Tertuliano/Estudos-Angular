import { Component, input, output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CATEGORY_OPTIONS } from '../data-access/product.model';
import { CurrencyMaskDirective } from '../../../core/directives/currency-mask.directive';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSlideToggleModule, CurrencyMaskDirective],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="product-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Descrição</mat-label>
        <textarea matInput formControlName="description" rows="2"></textarea>
      </mat-form-field>
      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Categoria</mat-label>
          <mat-select formControlName="category">
            @for (cat of categories; track cat) {
              <mat-option [value]="cat">{{ cat }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Preço (R$)</mat-label>
          <input matInput formControlName="priceDisplay" appCurrencyMask />
        </mat-form-field>
      </div>
      <mat-slide-toggle formControlName="active">Produto ativo</mat-slide-toggle>
      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || submitting()">
          {{ submitting() ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .product-form { display: flex; flex-direction: column; gap: 1rem; }
    .full-width { width: 100%; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-actions { display: flex; gap: 0.5rem; justify-content: flex-end; padding-top: 0.5rem; }
  `},
})
export class ProductFormComponent implements OnInit {
  private readonly fb = new FormBuilder();
  readonly categories = CATEGORY_OPTIONS;
  readonly submitting = input(false);

  readonly saved = output<{
    name: string; description: string; category: string; price: number; active: boolean;
  }>();

  readonly form: FormGroup = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    category: ['Serviço', Validators.required],
    priceDisplay: [''],
    active: [true],
  });

  ngOnInit() {
    this.form.get('priceDisplay')?.valueChanges.subscribe(() => {});
  }

  onSubmit() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    this.saved.emit({
      name: raw.name,
      description: raw.description,
      category: raw.category,
      price: raw.priceDisplay || 0,
      active: raw.active,
    });
    this.form.reset({ name: '', description: '', category: 'Serviço', priceDisplay: '', active: true });
  }
}
