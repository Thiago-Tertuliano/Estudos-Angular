import { CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <span class="label">{{ label() }}</span>
      <strong class="value">
        @if (format() === 'currency') {
          {{ value() | currency : 'BRL' }}
        } @else {
          {{ value() }}
        }
      </strong>
    </article>
  `,
  styles: `
    .card {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }
  `
})
export class SummaryCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly format = input<'number' | 'currency'>('number');
}
