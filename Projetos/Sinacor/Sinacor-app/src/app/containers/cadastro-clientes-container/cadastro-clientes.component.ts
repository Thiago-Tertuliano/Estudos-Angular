import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cliente } from '@features/cadastro-clientes/models/cliente.model';
import { ClienteFiltro } from '@features/cadastro-clientes/models/cliente-filtro.model';
import { ClienteFiltroPresenter } from '@features/cadastro-clientes/presenters/cliente-filtro.presenter';
import { ClienteListPresenter } from '@features/cadastro-clientes/presenters/cliente-list.presenter';
import { ClienteApiService } from '@features/cadastro-clientes/services/cliente-api.service';
import { ClienteService } from '@features/cadastro-clientes/services/cliente.service';
import { ClienteStateService } from '@features/cadastro-clientes/state/cliente-state.service';

@Component({
  selector: 'app-cadastro-clientes-container',
  standalone: true,
  imports: [ClienteFiltroPresenter, ClienteListPresenter],
  providers: [ClienteStateService, ClienteService, ClienteApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <span>PÁGINA INICIAL</span>
        <span class="separator">&gt;</span>
        <span class="current">CADASTRO DE CLIENTES</span>
      </nav>

      <header class="page-header">
        <h1>Cadastro de Clientes</h1>
        <p class="page-subtitle">Consulta</p>
        <div class="page-divider"></div>
      </header>

      <section class="consulta-stack">
        <section class="filtro-card">
          <app-cliente-filtro (pesquisar)="onPesquisar($event)" />
        </section>

        @if (clienteState.loading()) {
          <p class="loading">Carregando...</p>
        } @else {
          <app-cliente-list
            [clientes]="clienteState.clientes()"
            [totalRegistros]="clienteState.totalRegistros()"
            [pageIndex]="clienteState.pageIndex()"
            [pageSize]="clienteState.pageSize()"
            [pageSizeOptions]="pageSizeOptions"
            (acaoCliente)="onAcaoCliente($event)"
            (paginaAlterada)="onPaginaAlterada($event)"
          />
        }
      </section>
    </section>
  `,
  styles: `
    .page {
      padding: 12px 16px 16px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .breadcrumb {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      font-size: 11px;
      color: #757575;
      margin-bottom: 8px;
    }

    .breadcrumb .separator {
      color: #bdbdbd;
    }

    .breadcrumb .current {
      color: #1565c0;
      font-weight: 500;
    }

    .page-header {
      margin-bottom: 10px;
    }

    .page-header h1 {
      margin: 0 0 1px;
      font-size: 18px;
      font-weight: 400;
      color: #212121;
    }

    .page-subtitle {
      margin: 0 0 8px;
      color: #757575;
      font-size: 12px;
    }

    .page-divider {
      height: 2px;
      width: 100%;
      background: #1565c0;
    }

    .consulta-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }

    .filtro-card {
      background: #fff;
      border: 1px solid #d5dce3;
      border-radius: 0;
      overflow: hidden;
    }

    .loading {
      margin: 0;
      padding: 24px 16px;
      color: #616161;
      background: #fff;
      border: 1px solid #dde3e8;
      border-radius: 4px;
    }
  `,
})
export class CadastroClientesContainerComponent implements OnInit {
  readonly clienteState = inject(ClienteStateService);
  private readonly clienteService = inject(ClienteService);

  protected readonly pageSizeOptions = [...this.clienteState.pageSizeOptions];

  ngOnInit(): void {
    this.clienteService.loadClientes({}, true);
  }

  onPesquisar(filtros: ClienteFiltro): void {
    this.clienteService.loadClientes(filtros, true);
  }

  onPaginaAlterada(event: PageEvent): void {
    this.clienteService.changePage(event.pageIndex, event.pageSize);
  }

  onAcaoCliente(cliente: Cliente): void {
    console.log('Ação do cliente:', cliente.id);
  }
}
