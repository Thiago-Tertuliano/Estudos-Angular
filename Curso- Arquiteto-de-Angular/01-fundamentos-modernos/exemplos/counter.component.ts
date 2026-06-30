import { Component, computed, signal } from '@angular/core';

/**
 * EXEMPLO DE REFERÊNCIA — Módulo 01
 * Exercício: aula-pratica/scaffold/counter.component.ts
 * Gabarito:  aula-pratica/gabarito/counter.component.ts
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button type="button" (click)="increment()">+1</button>
    <button type="button" (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  // Estado local reativo — ideal para UI state (não server state)
  readonly count = signal(0);

  // Derivado automaticamente; recalcula só quando count muda
  readonly double = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
