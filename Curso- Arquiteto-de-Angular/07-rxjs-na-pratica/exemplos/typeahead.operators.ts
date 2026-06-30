import { pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Operator composto reutilizável — DRY em toda a app.
 */
export function typeahead<T>(
  searchFn: (term: string) => Observable<T[]>,
  debounceMs = 300,
  minLength = 2
) {
  return pipe(
    debounceTime(debounceMs),
    distinctUntilChanged(),
    filter((term: string) => term.trim().length >= minLength),
    switchMap((term) => searchFn(term.trim()))
  );
}
