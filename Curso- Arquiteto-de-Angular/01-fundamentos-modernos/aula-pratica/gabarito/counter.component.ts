/**
 * GABARITO — só consulte depois de tentar o scaffold
 * Referência idêntica a: ../../exemplos/counter.component.ts + histórico
 */
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button type="button" (click)="increment()">+1</button>
    <button type="button" (click)="reset()">Reset</button>
    <button type="button" (click)="undo()" [disabled]="!history().length">Desfazer</button>

    <ul>
      @for (value of history(); track $index) {
        <li>{{ value }}</li>
      } @empty {
        <li>Sem histórico</li>
      }
    </ul>
  `,
})
export class CounterComponent {
  readonly count = signal(0);
  readonly double = computed(() => this.count() * 2);
  readonly history = signal<number[]>([]);

  increment(): void {
    this.count.update((v) => v + 1);
    this.history.update((h) => [this.count(), ...h].slice(0, 5));
  }

  reset(): void {
    this.count.set(0);
    this.history.set([]);
  }

  undo(): void {
    const [previous, ...rest] = this.history();
    if (previous !== undefined) {
      this.count.set(previous);
      this.history.set(rest);
    }
  }
}
