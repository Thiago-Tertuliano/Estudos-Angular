/**
 * SCAFFOLD — Módulo 01, Exercício 1
 * Copie para: angular-lab/src/app/features/playground/ui/counter.component.ts
 * Referência: ../../exemplos/counter.component.ts
 */
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
  <!-- TODO: template com count(), double(), botões +1 e Reset -->
  <!-- Dica: veja ../../exemplos/counter.component.ts linhas 6-11 -->
  `,
})
export class CounterComponent {
  // TODO: readonly count = signal(0);
  // TODO: readonly double = computed(() => ...);

  increment(): void {
    // TODO: this.count.update(v => v + 1);
  }

  reset(): void {
    // TODO: this.count.set(0);
  }
}
