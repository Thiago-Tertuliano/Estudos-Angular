import { Injectable, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ClienteFiltro } from '@features/cadastro-clientes/models/cliente-filtro.model';
import { ClienteApiService } from '@features/cadastro-clientes/services/cliente-api.service';
import { ClienteStateService } from '@features/cadastro-clientes/state/cliente-state.service';

@Injectable()
export class ClienteService {
  private readonly api = inject(ClienteApiService);
  private readonly state = inject(ClienteStateService);

  loadClientes(filtros: ClienteFiltro = {}, resetPage = false): void {
    const filtrosAtivos = resetPage
      ? filtros
      : { ...this.state.filtros(), ...filtros };

    if (resetPage) {
      this.state.setPaginacao(0, this.state.pageSize());
    }

    this.state.setFiltros(filtrosAtivos);

    const pageIndex = this.state.pageIndex();
    const pageSize = this.state.pageSize();

    this.state.setLoading(true);
    this.api
      .listar(filtrosAtivos, pageIndex, pageSize)
      .pipe(finalize(() => this.state.setLoading(false)))
      .subscribe({
        next: (listagem) => {
          this.state.setClientes(listagem.items);
          this.state.setTotalRegistros(listagem.total);
        },
      });
  }

  changePage(pageIndex: number, pageSize: number): void {
    this.state.setPaginacao(pageIndex, pageSize);
    this.loadClientes();
  }
}
