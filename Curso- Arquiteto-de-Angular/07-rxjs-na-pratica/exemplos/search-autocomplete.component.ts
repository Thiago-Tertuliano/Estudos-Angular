import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  id: string;
  label: string;
}

@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="query" placeholder="Buscar transações..." />
    <ul>
      @for (item of results(); track item.id) {
        <li>{{ item.label }}</li>
      }
    </ul>
  `,
})
export class SearchAutocompleteComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly query = new FormControl('', { nonNullable: true });
  readonly results = signal<SearchResult[]>([]);

  constructor() {
    // FormControl → Observable → HTTP com cancelamento automático
    toObservable(this.query.valueChanges)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((term) => term.length >= 2),
        switchMap((term) =>
          this.http.get<SearchResult[]>(`/api/transactions/search?q=${term}`)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => this.results.set(data));
  }
}
