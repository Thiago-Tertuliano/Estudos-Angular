import { Injectable, signal } from '@angular/core';
import { ClienteFiltro } from '@features/cadastro-clientes/models/cliente-filtro.model';
import { Cliente } from '@features/cadastro-clientes/models/cliente.model';

@Injectable()
export class ClienteStateService {
  readonly pageSizeOptions = [10, 25, 50] as const;

  private readonly _clientes = signal<Cliente[]>([]);
  readonly clientes = this._clientes.asReadonly();

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  private readonly _filtros = signal<ClienteFiltro>({});
  readonly filtros = this._filtros.asReadonly();

  private readonly _totalRegistros = signal(0);
  readonly totalRegistros = this._totalRegistros.asReadonly();

  private readonly _pageIndex = signal(0);
  readonly pageIndex = this._pageIndex.asReadonly();

  private readonly _pageSize = signal(10);
  readonly pageSize = this._pageSize.asReadonly();

  setClientes(clientes: Cliente[]): void {
    this._clientes.set(clientes);
  }

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  setFiltros(filtros: ClienteFiltro): void {
    this._filtros.set(filtros);
  }

  setTotalRegistros(total: number): void {
    this._totalRegistros.set(total);
  }

  setPaginacao(pageIndex: number, pageSize: number): void {
    this._pageIndex.set(pageIndex);
    this._pageSize.set(pageSize);
  }
}
