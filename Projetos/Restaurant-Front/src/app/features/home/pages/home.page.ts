import { Component, inject, OnInit } from "@angular/core";
import { TablesFacade } from "@features/tables/data-access/tables.facade";
import { TableListComponent } from "@features/tables/ui/table-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableListComponent],
  template: `
    <h1>Restaurant Front</h1>
    <p>Sprint 5 - smart + dumb components</p>

    @if (facade.error()) {
      <p class="error">{{ facade.error() }}</p>
    }

    <app-table-list [tables]="facade.items()" [loading]="facade.loading()" />
  `,
  styles: `
  .error {
    color: red;
    margin-bottom: 1rem;
  }
  `,
})
export class HomePage implements OnInit {
  readonly facade = inject(TablesFacade);

  ngOnInit(): void {
    this.facade.loadAll();
  }
}
