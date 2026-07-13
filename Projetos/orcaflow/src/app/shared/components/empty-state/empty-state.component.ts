import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <div class="empty-state__icon">📋</div>
      <h3 class="empty-state__title">{{ title() }}</h3>
      @if (message(); as msg) {
        <p class="empty-state__message">{{ msg }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [`
    .empty-state { text-align: center; padding: 3rem 1.5rem; color: #666; }
    .empty-state__icon { font-size: 3rem; margin-bottom: 0.75rem; }
    .empty-state__title { font-size: 1.125rem; font-weight: 600; color: #333; margin: 0 0 0.5rem; }
    .empty-state__message { font-size: 0.875rem; color: #888; margin: 0; }
  `],
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input<string>();
}
