import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="search"
      placeholder="Filtrar..."
      [ngModel]="search()"
      (ngModelChange)="searchChange.emit($event)"
    />
  `,
})
export class CatalogFiltersComponent {
  readonly search = input.required<string>();
  readonly searchChange = output<string>();
}
