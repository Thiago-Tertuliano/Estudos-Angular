import { CurrencyPipe } from '@angular/common';
import { Component, forwardRef, inject, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../data-access/product.service';

@Component({
  selector: 'app-product-selector',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, CurrencyPipe],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProductSelectorComponent), multi: true }],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Produto</mat-label>
      <mat-select (selectionChange)="onSelect($event.value)" [value]="selectedId()" [disabled]="disabled()">
        @for (p of activeProducts(); track p.id) {
          <mat-option [value]="p.id">
            {{ p.name }} — {{ p.price | currency:'BRL':'symbol':'1.2-2' }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ['.full-width { width: 100%; }'],
})
export class ProductSelectorComponent implements ControlValueAccessor {
  private readonly productService = inject(ProductService);
  readonly activeProducts = computed(() => this.productService.items().filter(p => p.active));
  readonly selectedId = signal<number | null>(null);
  readonly disabled = signal(false);

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.selectedId.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }

  onSelect(id: number) {
    this.selectedId.set(id);
    this.onChange(id);
    this.onTouched();
  }
}
