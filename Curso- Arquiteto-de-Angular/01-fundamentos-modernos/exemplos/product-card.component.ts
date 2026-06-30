import { Component, input, output, booleanAttribute } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

/**
 * EXEMPLO DE REFERÊNCIA — Módulo 01
 * Exercício: aula-pratica/scaffold/product-card.component.ts
 */
export interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <article [class.disabled]="disabled()">
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency: 'BRL' }}</p>
      @if (!disabled()) {
        <button type="button" (click)="addToCart.emit(product().id)">
          Adicionar
        </button>
      }
    </article>
  `,
  styles: `
    .disabled { opacity: 0.5; pointer-events: none; }
  `,
})
export class ProductCardComponent {
  // input.required garante em compile-time que o pai passou o valor
  readonly product = input.required<Product>();

  // transform converte attribute string "true" em boolean
  readonly disabled = input(false, { transform: booleanAttribute });

  // output tipado — sem EventEmitter manual
  readonly addToCart = output<string>();
}
