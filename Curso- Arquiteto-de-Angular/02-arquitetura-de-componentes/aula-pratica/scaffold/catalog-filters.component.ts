import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [FormsModule],
  // TODO: changeDetection: ChangeDetectionStrategy.OnPush
  template: `
    <!-- TODO: input search com ngModel + searchChange.emit -->
  `,
})
export class CatalogFiltersComponent {
  // TODO: search = input.required<string>()
  // TODO: searchChange = output<string>()
}
