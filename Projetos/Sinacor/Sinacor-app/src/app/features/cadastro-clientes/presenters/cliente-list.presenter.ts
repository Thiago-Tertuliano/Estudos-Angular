import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '@features/cadastro-clientes/models/cliente.model';
import { formatarDocumento } from '@features/cadastro-clientes/utils/format-documento.util';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, MatIconModule, MatTableModule],
  template: `
    <section class="lista-shell">
      <div class="tabela-card">
        @if (clientes().length === 0) {
          <p class="empty-state">Nenhum cliente encontrado.</p>
        } @else {
          <table mat-table [dataSource]="clientes()" class="sinacor-table">
            <colgroup>
              <col class="col-nome" />
              <col class="col-residente" />
              <col class="col-tipo-doc" />
              <col class="col-num-doc" />
              <col class="col-status" />
              <col class="col-data" />
              <col class="col-acoes" />
            </colgroup>
            <ng-container matColumnDef="nomeCliente">
              <th mat-header-cell *matHeaderCellDef class="col-nome">
                <span class="th-label">
                  Nome do Cliente
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-nome">{{ cliente.nomeCliente }}</td>
            </ng-container>

            <ng-container matColumnDef="residente">
              <th mat-header-cell *matHeaderCellDef class="col-residente">
                <span class="th-label">
                  Residente
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-residente">
                {{ cliente.residente ? 'Sim' : 'Não' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="tipoDocumento">
              <th mat-header-cell *matHeaderCellDef class="col-tipo-doc">
                <span class="th-label">
                  Tipo Documento
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-tipo-doc">
                {{ cliente.tipoDocumento }}
              </td>
            </ng-container>

            <ng-container matColumnDef="numeroDocumento">
              <th mat-header-cell *matHeaderCellDef class="col-num-doc">
                <span class="th-label">
                  Número Documento
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-num-doc">
                {{ formatarDocumento(cliente.numeroDocumento, cliente.tipoDocumento) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="statusInvestidor">
              <th mat-header-cell *matHeaderCellDef class="col-status">
                <span class="th-label">
                  Status Investidor
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-status">
                <span [class]="'badge-' + cliente.statusInvestidor.toLowerCase()">
                  {{ cliente.statusInvestidor }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="dataHoraInclusao">
              <th mat-header-cell *matHeaderCellDef class="col-data">
                <span class="th-label">
                  Data/Hora Inclusão
                  <mat-icon class="sort-icon">unfold_more</mat-icon>
                </span>
              </th>
              <td mat-cell *matCellDef="let cliente" class="col-data">
                {{ cliente.dataHoraInclusao | date: 'dd/MM/yyyy - HH:mm:ss' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="acoes">
              <th mat-header-cell *matHeaderCellDef class="col-acoes"></th>
              <td mat-cell *matCellDef="let cliente" class="col-acoes">
                <button
                  class="acao-btn"
                  type="button"
                  aria-label="Ações do cliente"
                  (click)="acaoCliente.emit(cliente)"
                >
                  <mat-icon>more_horiz</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        }
      </div>

      <footer class="paginacao-card">
        <div class="paginacao-bar">
          <div class="paginacao-esquerda">
            <select
              class="page-size-select"
              [value]="pageSize()"
              aria-label="Quantidade de resultados por página"
              (change)="onPageSizeChange($event)"
            >
              @for (opt of pageSizeOptions(); track opt) {
                <option [value]="opt">Mostrar {{ opt }} resultados</option>
              }
            </select>
            <span class="total-inline">
              Total de <strong>{{ totalRegistros() }}</strong> resultados.
            </span>
          </div>

          <div class="paginacao-direita">
            @for (pagina of paginasVisiveis; track pagina) {
              <button
                type="button"
                class="pagina-numero"
                [class.ativa]="pagina === pageIndex()"
                [attr.aria-current]="pagina === pageIndex() ? 'page' : null"
                [attr.aria-label]="'Página ' + (pagina + 1)"
                (click)="irParaPagina(pagina)"
              >
                {{ pagina + 1 }}
              </button>
            }
            <button
              type="button"
              class="pagina-link"
              [disabled]="!temProxima"
              (click)="proxima()"
            >
              Próxima
            </button>
            <button
              type="button"
              class="pagina-link"
              [disabled]="!temUltima"
              (click)="ultima()"
            >
              Último
            </button>
          </div>
        </div>
      </footer>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .lista-shell {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .tabela-card {
      background: #fff;
      border: 1px solid #dde3e8;
      border-radius: 0;
      overflow: hidden;
    }

    .empty-state {
      margin: 16px 12px;
      color: #616161;
      font-size: 12px;
    }

    .sinacor-table {
      width: 100%;
      border-collapse: collapse;
      --mat-table-row-item-container-height: 28px;
      --mat-table-header-container-height: 30px;
    }

    .sinacor-table col.col-nome {
      width: auto;
    }

    .sinacor-table col.col-residente {
      width: 96px;
    }

    .sinacor-table col.col-tipo-doc {
      width: 118px;
    }

    .sinacor-table col.col-num-doc {
      width: 158px;
    }

    .sinacor-table col.col-status {
      width: 128px;
    }

    .sinacor-table col.col-data {
      width: 178px;
    }

    .sinacor-table col.col-acoes {
      width: 48px;
    }

    :host ::ng-deep .sinacor-table th.col-nome,
    :host ::ng-deep .sinacor-table td.col-nome {
      padding: 6px 12px 6px 14px !important;
      text-align: left;
    }

    :host ::ng-deep .sinacor-table th.col-residente,
    :host ::ng-deep .sinacor-table td.col-residente,
    :host ::ng-deep .sinacor-table th.col-tipo-doc,
    :host ::ng-deep .sinacor-table td.col-tipo-doc,
    :host ::ng-deep .sinacor-table th.col-num-doc,
    :host ::ng-deep .sinacor-table td.col-num-doc,
    :host ::ng-deep .sinacor-table th.col-status,
    :host ::ng-deep .sinacor-table td.col-status,
    :host ::ng-deep .sinacor-table th.col-data,
    :host ::ng-deep .sinacor-table td.col-data {
      padding: 6px 12px !important;
      text-align: left;
    }

    :host ::ng-deep .sinacor-table th.col-num-doc,
    :host ::ng-deep .sinacor-table td.col-num-doc,
    :host ::ng-deep .sinacor-table th.col-data,
    :host ::ng-deep .sinacor-table td.col-data {
      white-space: nowrap;
    }

    :host ::ng-deep .sinacor-table th.col-acoes,
    :host ::ng-deep .sinacor-table td.col-acoes {
      width: 48px;
      min-width: 48px;
      max-width: 48px;
      padding: 4px 8px !important;
      text-align: center;
    }

    .th-label {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      font-weight: 600;
      color: #37474f;
    }

    .sort-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
      color: #90a4ae;
    }

    :host ::ng-deep .sinacor-table.mat-mdc-table {
      border-collapse: collapse;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-header-row {
      height: 30px;
      min-height: 30px;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-row {
      height: 28px;
      min-height: 28px;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-header-cell,
    :host ::ng-deep .sinacor-table .mdc-data-table__header-cell {
      background: #e9edf2;
      border-bottom: 1px solid #d5dce3;
      border-right: 1px solid #d5dce3;
      vertical-align: middle;
      font-size: 11px;
      box-sizing: border-box;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-header-cell:last-child {
      border-right: none;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-cell,
    :host ::ng-deep .sinacor-table .mdc-data-table__cell {
      font-size: 12px;
      color: #546e7a;
      border-bottom: 1px solid #e8ecf1;
      border-right: 1px solid #d5dce3;
      vertical-align: middle;
      line-height: 1.3;
      box-sizing: border-box;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-cell .mat-mdc-cell-content,
    :host ::ng-deep .sinacor-table .mat-mdc-header-cell .mat-mdc-cell-content {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-cell:last-child {
      border-right: none;
    }

    :host ::ng-deep .sinacor-table .mat-mdc-row:last-child .mat-mdc-cell {
      border-bottom: none;
    }

    .acao-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1.5px solid #1976d2;
      background: transparent;
      cursor: pointer;
      padding: 0;
      line-height: 0;
      transition: background 0.15s;
    }

    .acao-btn:hover {
      background: rgba(25, 118, 210, 0.06);
    }

    .acao-btn mat-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
      color: #1976d2;
    }

    .paginacao-card {
      padding: 0 2px;
    }

    .paginacao-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .paginacao-esquerda {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .page-size-select {
      appearance: auto;
      background: #fff;
      border: 1px solid #cfd8dc;
      border-radius: 3px;
      padding: 3px 24px 3px 8px;
      font-size: 12px;
      color: #607d8b;
      font-family: inherit;
      cursor: pointer;
      min-height: 28px;
      height: 28px;
    }

    .page-size-select:focus {
      outline: none;
      border-color: #1565c0;
    }

    .total-inline {
      font-size: 12px;
      color: #90a4ae;
    }

    .total-inline strong {
      color: #455a64;
      font-weight: 600;
    }

    .paginacao-direita {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .pagina-numero {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: none;
      background: #eceff1;
      color: #78909c;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      padding: 0;
      line-height: 26px;
      text-align: center;
      transition: background 0.15s, color 0.15s;
    }

    .pagina-numero:hover:not(.ativa) {
      background: #dde3e8;
      color: #546e7a;
    }

    .pagina-numero.ativa {
      background: #1565c0;
      color: #fff;
    }

    .pagina-link {
      border: none;
      background: transparent;
      color: #90a4ae;
      font-size: 12px;
      cursor: pointer;
      padding: 2px 4px;
      font-family: inherit;
    }

    .pagina-link:hover:not(:disabled) {
      color: #1565c0;
    }

    .pagina-link:disabled {
      color: #cfd8dc;
      cursor: default;
    }
  `,
})
export class ClienteListPresenter {
  clientes = input.required<Cliente[]>();
  totalRegistros = input.required<number>();
  pageIndex = input.required<number>();
  pageSize = input.required<number>();
  pageSizeOptions = input<number[]>([10, 25, 50]);

  acaoCliente = output<Cliente>();
  paginaAlterada = output<PageEvent>();

  protected readonly formatarDocumento = formatarDocumento;

  protected readonly displayedColumns = [
    'nomeCliente',
    'residente',
    'tipoDocumento',
    'numeroDocumento',
    'statusInvestidor',
    'dataHoraInclusao',
    'acoes',
  ];

  get totalPaginas(): number {
    const size = this.pageSize();
    if (size <= 0) {
      return 1;
    }
    return Math.max(1, Math.ceil(this.totalRegistros() / size));
  }

  get paginasVisiveis(): number[] {
    const total = this.totalPaginas;
    const atual = this.pageIndex();
    const maxVisiveis = 4;

    if (total <= maxVisiveis) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const inicio = Math.max(0, Math.min(atual - 1, total - maxVisiveis));
    return Array.from({ length: maxVisiveis }, (_, i) => inicio + i);
  }

  get temProxima(): boolean {
    return this.pageIndex() < this.totalPaginas - 1;
  }

  get temUltima(): boolean {
    return this.pageIndex() < this.totalPaginas - 1;
  }

  irParaPagina(index: number): void {
    if (index < 0 || index >= this.totalPaginas || index === this.pageIndex()) {
      return;
    }
    this.emitirPagina(index, this.pageSize());
  }

  proxima(): void {
    if (this.temProxima) {
      this.irParaPagina(this.pageIndex() + 1);
    }
  }

  ultima(): void {
    this.irParaPagina(this.totalPaginas - 1);
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const novoTamanho = Number(select.value);
    if (!Number.isFinite(novoTamanho) || novoTamanho === this.pageSize()) {
      return;
    }
    this.emitirPagina(0, novoTamanho);
  }

  private emitirPagina(pageIndex: number, pageSize: number): void {
    this.paginaAlterada.emit({
      pageIndex,
      pageSize,
      length: this.totalRegistros(),
    } as PageEvent);
  }
}
