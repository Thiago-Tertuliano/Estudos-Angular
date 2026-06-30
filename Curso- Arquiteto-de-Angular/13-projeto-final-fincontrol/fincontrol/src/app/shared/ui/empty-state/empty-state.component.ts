import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty">
      <p class="title">{{ title() }}</p>
      @if (message()) {
        <p class="message">{{ message() }}</p>
      }
    </div>
  `,
  styles: `
    .empty {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--color-muted);
    }
    .title { font-size: 1.125rem; margin: 0 0 0.5rem; color: var(--color-text); }
    .message { margin: 0; font-size: 0.875rem; }
  `,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input<string>();
}
