/**
 * SCAFFOLD — Módulo 01, Exercício 2
 * Copie para: angular-lab/src/app/features/playground/ui/product-card.component.ts
 * Referência: ../../exemplos/product-card.component.ts
 */
import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// TODO: export interface Product { id: string; name: string; price: number; }

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <!-- TODO: article com product().name, product().price | currency:'BRL' -->
    <!-- TODO: botão (click)="addToCart.emit(product().id)" -->
  `,
})
export class ProductCardComponent {
  // TODO: readonly product = input.required<Product>();
  // TODO: readonly addToCart = output<string>();
}
