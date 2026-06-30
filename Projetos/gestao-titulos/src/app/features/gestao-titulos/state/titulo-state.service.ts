import { computed, Injectable, signal } from '@angular/core';
import { Titulo } from '../models/titulo.model';

@Injectable({ providedIn: 'root' })
export class TituloStateService {
  private readonly _loading = signal(false);
  private readonly _data = signal<Titulo[]>([]);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly data = this._data.asReadonly();
  readonly error = this._error.asReadonly();

  readonly hasData = computed(() => this._data().length > 0);
  readonly errorMessage = computed(() =>
    this._error() ? `Erro: ${this._error()}` : null,
  );

  setLoading(value: boolean): void {
    this._loading.set(value);
  }

  setData(value: Titulo[]): void {
    this._data.set(value);
    this._error.set(null);
  }

  setError(message: string): void {
    this._error.set(message);
  }

  updateItem(updated: Titulo): void {
    this._data.update((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
  }
}
