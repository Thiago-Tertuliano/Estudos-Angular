/**
 * SCAFFOLD — Módulo 01, Passo 5
 * Copie para: angular-lab/src/app/features/playground/pages/playground.page.ts
 */
import { Component } from '@angular/core';
// TODO: import CounterComponent e ProductListComponent

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [
    // TODO: CounterComponent, ProductListComponent
  ],
  template: `
    <h1>Playground — Módulo 01</h1>

    <section>
      <h2>Counter</h2>
      <!-- TODO: <app-counter /> -->
    </section>

    <section>
      <h2>Produtos</h2>
      <!-- TODO: <app-product-list /> -->
    </section>
  `,
})
export class PlaygroundPage {}
