import { Component } from '@angular/core';
import { CounterComponent } from '../ui/counter.component';
import { ProductListComponent } from '../ui/product-list.component';

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [CounterComponent, ProductListComponent],
  template: `
    <h1>Playground — Módulo 01</h1>

    <section>
      <h2>Counter</h2>
      <app-counter />
    </section>

    <section>
      <h2>Produtos</h2>
      <app-product-list />
    </section>
  `,
  styles: `
    section {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }
  `,
})
export class PlaygroundPage {}
