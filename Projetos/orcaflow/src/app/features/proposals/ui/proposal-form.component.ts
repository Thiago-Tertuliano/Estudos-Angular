import { Component, input, output, signal, computed, effect, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../clients/data-access/client.model';
import { ProductSelectorComponent } from '../../products/ui/product-selector.component';
import { ProductService } from '../../products/data-access/product.service';
import { Product } from '../../products/data-access/product.model';
import { ProposalStatus } from '../data-access/proposal.model';
import { CurrencyMaskDirective } from '../../../core/directives/currency-mask.directive';

@Component({
  selector: 'app-proposal-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ProductSelectorComponent, CurrencyMaskDirective],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="proposal-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Cliente</mat-label>
        <mat-select formControlName="clientId">
          @for (c of clients(); track c.id) {
            <mat-option [value]="c.id">{{ c.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option value="draft">Rascunho</mat-option>
          <mat-option value="sent">Enviada</mat-option>
          <mat-option value="approved">Aprovada</mat-option>
          <mat-option value="rejected">Rejeitada</mat-option>
        </mat-select>
      </mat-form-field>

      <div formArrayName="items" class="items-section">
        <h3>Itens da Proposta</h3>
        @for (item of items.controls; track $index) {
          <div [formGroupName]="$index" class="item-row">
            <app-product-selector formControlName="productId" />
            <mat-form-field appearance="outline" class="qty-field">
              <mat-label>Qtd</mat-label>
              <input matInput formControlName="quantity" type="number" min="1" />
            </mat-form-field>
            <mat-form-field appearance="outline" class="price-field">
              <mat-label>Preço Unit.</mat-label>
              <input matInput formControlName="unitPriceDisplay" appCurrencyMask />
            </mat-form-field>
            <div class="item-total">{{ lineTotal($index) | currency:'BRL':'symbol':'1.2-2' }}</div>
            <button mat-icon-button color="warn" type="button" (click)="removeItem($index)">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        }
        <button mat-stroked-button type="button" (click)="addItem()" class="add-btn">
          + Adicionar Item
        </button>
      </div>

      <div class="total-row">
        <span>Subtotal:</span>
        <span>{{ subtotal() | currency:'BRL':'symbol':'1.2-2' }}</span>
      </div>
      <mat-form-field appearance="outline">
        <mat-label>Desconto (R$)</mat-label>
        <input matInput formControlName="discountDisplay" appCurrencyMask />
      </mat-form-field>
      <div class="total-row total-final">
        <span>Total:</span>
        <span>{{ total() | currency:'BRL':'symbol':'1.2-2' }}</span>
      </div>

      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || submitting()">
          {{ submitting() ? 'Salvando...' : 'Salvar Proposta' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .proposal-form { display: flex; flex-direction: column; gap: 1rem; }
    .full-width { width: 100%; }
    .items-section { background: #f9f9f9; padding: 1rem; border-radius: 8px; }
    .items-section h3 { margin: 0 0 1rem; font-size: 1rem; color: #333; }
    .item-row { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; }
    .item-row > * { flex: 1; min-width: 120px; }
    .qty-field { max-width: 80px; }
    .price-field { max-width: 140px; }
    .item-total { min-width: 100px; font-weight: 600; color: #1a1a2e; font-size: 0.9rem; }
    .add-btn { width: 100%; }
    .total-row { display: flex; justify-content: flex-end; gap: 1rem; font-size: 1rem; padding: 0.25rem 0; }
    .total-final { font-size: 1.25rem; font-weight: 700; color: #1a1a2e; border-top: 2px solid #e94560; padding-top: 0.75rem; }
    .form-actions { display: flex; justify-content: flex-end; padding-top: 0.5rem; }
  `],
})
export class ProposalFormComponent {
  private readonly fb = new FormBuilder();
  private readonly productService = inject(ProductService);

  readonly clients = input.required<Client[]>();
  readonly submitting = input(false);

  readonly saved = output<{
    clientId: number; status: ProposalStatus; discount: number;
    items: { productId: number; productName: string; quantity: number; unitPrice: number }[];
  }>();

  readonly form: FormGroup = this.fb.nonNullable.group({
    clientId: [null, Validators.required],
    status: ['draft'],
    discountDisplay: [''],
    items: this.fb.array([]),
  });

  get items(): FormArray { return this.form.get('items') as FormArray; }

  subtotal = computed(() => {
    return this.items.controls.reduce((sum: number, ctrl) => {
      const qty = +(ctrl.get('quantity')?.value || 0);
      const price = +(ctrl.get('unitPrice')?.value || 0);
      return sum + qty * price;
    }, 0);
  });

  total = computed(() => {
    const discount = +(this.form.get('discountDisplay')?.value || 0);
    return Math.max(0, this.subtotal() - discount);
  });

  addItem(productId?: number) {
    const group = this.fb.nonNullable.group({
      productId: [productId || null, Validators.required],
      productName: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0],
      unitPriceDisplay: [''],
    });

    group.get('productId')?.valueChanges.subscribe(id => {
      if (!id) return;
      const product = this.productService.items().find(p => p.id === id);
      if (product) {
        group.patchValue({
          productName: product.name,
          unitPrice: product.price,
          unitPriceDisplay: product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        }, { emitEvent: false });
      }
    });

    this.items.push(group);
  }

  removeItem(index: number) { this.items.removeAt(index); }

  lineTotal(index: number): number {
    const ctrl = this.items.at(index);
    const qty = +(ctrl.get('quantity')?.value || 0);
    const price = +(ctrl.get('unitPrice')?.value || 0);
    return qty * price;
  }

  onSubmit() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    interface RawItem { productId: number; quantity: number; unitPrice: number; }
    const items: RawItem[] = raw.items.map((i: { productId: number; quantity: number; unitPrice: number }) => ({
      productId: i.productId,
      quantity: i.quantity,
      unitPrice: i.unitPrice || 0,
    }));
    const enrichedItems = items.map((i) => {
      const product = this.productService.items().find(p => p.id === i.productId);
      return { ...i, productName: product?.name || '' };
    });
    this.saved.emit({
      clientId: raw.clientId,
      status: raw.status,
      discount: raw.discountDisplay || 0,
      items: enrichedItems,
    });
  }
}
