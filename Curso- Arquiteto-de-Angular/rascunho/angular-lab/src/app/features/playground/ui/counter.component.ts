import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button type="button" (click)="increment()">+1</button>
    <button type="button" (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  readonly count = signal(0);
  readonly double = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
