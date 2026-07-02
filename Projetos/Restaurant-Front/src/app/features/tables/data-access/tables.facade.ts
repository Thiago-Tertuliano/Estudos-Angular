import { Injectable, inject, signal } from "@angular/core";
import { Table } from "./table.model";
import { finalize, tap } from "rxjs";
import { TablesApi } from "./tables.api";

@Injectable({ providedIn: 'root' })
export class TablesFacade {
  private readonly api = inject(TablesApi);

  readonly items = signal<Table[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.getAll().pipe(
      tap((data) => this.items.set(data)),
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      error: () => this.error.set('Falha ao carregar mesas'),
    });
  }
}
