import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.card--padding]="padding()">
      @if (headerTitle()) {
        <div class="card__header">
          <h3 class="card__title">{{ headerTitle() }}</h3>
          @if (headerAction()) {
            <div class="card__action"><ng-content select="[card-action]" /></div>
          }
        </div>
      }
      <div class="card__body"><ng-content /></div>
      @if (footerContent()) {
        <div class="card__footer">{{ footerContent() }}</div>
      } @else {
        <ng-content select="[card-footer]" />
      }
    </div>
  `,
  styles: [`
    .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
    .card--padding { padding: 1.5rem; }
    .card__header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid #eee; }
    .card__title { margin: 0; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
    .card__body { padding: 1.5rem; }
    .card__footer { padding: 1rem 1.5rem; border-top: 1px solid #eee; font-size: 0.875rem; color: #666; }
  `],
})
export class CardComponent {
  readonly headerTitle = input<string>();
  readonly headerAction = input<boolean>(false);
  readonly footerContent = input<string>();
  readonly padding = input(true);
}
