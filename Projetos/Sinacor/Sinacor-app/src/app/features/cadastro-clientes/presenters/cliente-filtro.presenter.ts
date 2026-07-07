import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  ClienteFiltro,
  TipoPessoa,
} from '@features/cadastro-clientes/models/cliente-filtro.model';

type BuscarPor = 'nome' | 'documento';

interface ChipFiltro {
  key: keyof ClienteFiltro;
  label: string;
  valor: string;
  obrigatorio?: boolean;
  icone: 'texto' | 'numero';
}

@Component({
  selector: 'app-cliente-filtro',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="filtro-shell">
      <!-- Linha 1: tags + chevron + pesquisar (sempre visível) -->
      <div
        class="filtro-top"
        [class.com-painel]="painelAberto"
        [class.com-filtros]="chipsExibidos.length > 0"
      >
        <div class="filtro-tags">
          @if (chipsExibidos.length === 0) {
            <span class="filtro-placeholder">Filtrar</span>
          }
          @for (chip of chipsExibidos; track chip.key) {
            <div class="filtro-tag">
              <div class="tag-label">
                @if (chip.icone === 'numero') {
                  <mat-icon class="tag-icone-mat">description</mat-icon>
                } @else {
                  <span class="tag-icone">Aa</span>
                }
                <span class="tag-label-text">
                  {{ chip.label }}@if (chip.obrigatorio) {
                    <span class="req">*</span>
                  }
                </span>
              </div>
              <div class="tag-valor">
                <span>{{ chip.valor }}</span>
                <button
                  type="button"
                  class="tag-remove"
                  aria-label="Remover filtro"
                  (click)="removerChip(chip.key)"
                >
                  <mat-icon>close</mat-icon>
                </button>
              </div>
            </div>
          }
        </div>

        <button
          type="button"
          class="btn-chevron"
          [class.aberto]="painelAberto"
          aria-label="Expandir filtros"
          (click)="togglePainel()"
        >
          <mat-icon class="chevron-icon">{{
            painelAberto ? 'expand_less' : 'expand_more'
          }}</mat-icon>
        </button>

        <button type="button" class="btn-pesquisar" [class.ativo]="chipsExibidos.length > 0" (click)="onPesquisar()">
          <mat-icon class="pesquisar-icon">search</mat-icon>
          Pesquisar
        </button>
      </div>

      <!-- Linha 2: painel expandido -->
      @if (painelAberto) {
        <div class="filtro-painel">
          <div class="painel-grid">
            <label class="sinacor-label grid-label-tipo">Tipo Pessoa*</label>
            <label class="sinacor-label grid-label-busca">Buscar Cliente por:</label>
            <label class="sinacor-label grid-label-data">Data Última Alteração</label>

            <div class="grid-campo-tipo">
              <select
                class="sinacor-input tipo-select"
                [(ngModel)]="tipoPessoa"
                name="tipoPessoa"
                (ngModelChange)="onTipoPessoaChange(); atualizarView()"
              >
                <option value="">Selecione...</option>
                <option value="PF">Pessoa Física</option>
                <option value="PJ">Pessoa Jurídica</option>
              </select>
              <div class="residente-row">
                <label class="chk-item">
                  <input
                    type="checkbox"
                    [(ngModel)]="filtroNaoResidente"
                    name="filtroNaoResidente"
                    (ngModelChange)="atualizarView()"
                  />
                  Não Residente
                </label>
                <label class="chk-item">
                  <input
                    type="checkbox"
                    [(ngModel)]="filtroResidente"
                    name="filtroResidente"
                    (ngModelChange)="atualizarView()"
                  />
                  Residente
                </label>
              </div>
            </div>

            <div class="grid-campo-busca">
              <select
                class="sinacor-input busca-select"
                [(ngModel)]="buscarPor"
                name="buscarPor"
                (ngModelChange)="onBuscarPorChange(); atualizarView()"
              >
                <option value="nome">Nome</option>
                <option value="documento">Documento</option>
              </select>
              <input
                class="sinacor-input busca-texto"
                type="text"
                placeholder="Informe..."
                [(ngModel)]="buscaTexto"
                name="buscaTexto"
                (ngModelChange)="atualizarView()"
              />
            </div>

            <div class="grid-campo-data">
              <input
                class="sinacor-input data-input"
                type="text"
                placeholder="00/00/0000"
                [(ngModel)]="dataExibicao"
                name="dataExibicao"
                (ngModelChange)="onDataChange($event)"
              />
              <mat-icon class="data-icone">calendar_today</mat-icon>
            </div>

            <div class="painel-acoes">
              <button
                type="button"
                class="btn-acao btn-limpar"
                aria-label="Limpar filtros"
                (click)="limparFiltros()"
              >
                <mat-icon>delete_outline</mat-icon>
              </button>
              <button
                type="button"
                class="btn-acao btn-fechar"
                aria-label="Fechar painel"
                (click)="fecharPainel()"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: `
    :host {
      --sinacor-azul: #1976d2;
      --sinacor-azul-hover: #1565c0;
      --sinacor-input-bg: #e9ebf2;
      --sinacor-input-border: #455a64;
      --sinacor-tag-valor: #e8eaed;
      --sinacor-label: #607d8b;
      --sinacor-bar-height: 34px;
      --sinacor-radius: 4px;
      --sinacor-bar-neutro-bg: linear-gradient(180deg, #fafbfc 0%, #eef1f4 100%);
      --sinacor-bar-neutro-texto: #90a4ae;
      --sinacor-bar-borda: #d5dce3;
    }

    .filtro-shell {
      position: relative;
      background: #fff;
    }

    /* ── Barra superior ── */
    .filtro-top {
      display: flex;
      align-items: stretch;
      height: var(--sinacor-bar-height);
      background: #fff;
    }

    .filtro-top.com-painel {
      border-bottom: 1px solid #dde3e8;
    }

    .filtro-tags {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 6px;
      padding: 0 12px;
      overflow-x: auto;
      scrollbar-width: thin;
      min-width: 0;
    }

    .filtro-placeholder {
      font-size: 12px;
      color: #b0bec5;
      line-height: 1;
      user-select: none;
    }

    .filtro-tag {
      display: inline-flex;
      align-items: stretch;
      flex-shrink: 0;
      height: 26px;
      border-radius: 3px;
      overflow: hidden;
    }

    .tag-label {
      display: flex;
      align-items: center;
      gap: 5px;
      background: var(--sinacor-azul);
      color: #fff;
      padding: 0 8px;
      white-space: nowrap;
    }

    .tag-icone {
      font-size: 9px;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 2px;
      padding: 1px 3px;
      line-height: 1;
      flex-shrink: 0;
    }

    .tag-icone-mat {
      font-size: 13px;
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }

    .tag-label-text {
      font-size: 10px;
      font-weight: 500;
      line-height: 1.2;
    }

    .tag-valor {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--sinacor-tag-valor);
      padding: 0 5px 0 6px;
      font-size: 11px;
      color: #37474f;
      white-space: nowrap;
    }

    .tag-remove {
      display: inline-flex;
      border: none;
      background: transparent;
      cursor: pointer;
      color: #78909c;
      padding: 0;
      line-height: 0;
    }

    .tag-remove:hover {
      color: #455a64;
    }

    .tag-remove mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }

    .btn-chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      flex-shrink: 0;
      border: none;
      border-left: 1px solid var(--sinacor-bar-borda);
      background: var(--sinacor-bar-neutro-bg);
      cursor: pointer;
      padding: 0;
    }

    .btn-chevron:hover {
      background: linear-gradient(180deg, #f3f5f7 0%, #e8ebef 100%);
    }

    .chevron-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--sinacor-bar-neutro-texto);
    }

    .filtro-top.com-filtros .btn-chevron:not(.aberto) .chevron-icon {
      color: var(--sinacor-azul);
    }

    .btn-chevron.aberto .chevron-icon {
      color: #546e7a;
    }

    .btn-pesquisar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      flex-shrink: 0;
      border: none;
      border-left: 1px solid var(--sinacor-bar-borda);
      background: var(--sinacor-bar-neutro-bg);
      color: var(--sinacor-bar-neutro-texto);
      padding: 0 18px;
      font-size: 12px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      height: var(--sinacor-bar-height);
      min-width: 112px;
      transition: background 0.15s, color 0.15s;
    }

    .btn-pesquisar:hover:not(.ativo) {
      background: linear-gradient(180deg, #f3f5f7 0%, #e8ebef 100%);
    }

    .btn-pesquisar.ativo {
      background: var(--sinacor-azul);
      color: #fff;
      border-left-color: var(--sinacor-azul);
    }

    .btn-pesquisar.ativo:hover {
      background: var(--sinacor-azul-hover);
    }

    .pesquisar-icon {
      font-size: 17px;
      width: 17px;
      height: 17px;
      color: var(--sinacor-bar-neutro-texto);
    }

    .btn-pesquisar.ativo .pesquisar-icon {
      color: #fff;
    }

    /* ── Painel expandido (grid 2 linhas) ── */
    .filtro-painel {
      padding: 8px 10px 10px;
      border-bottom: 1px solid #dde3e8;
      background: #fff;
      overflow-x: auto;
    }

    .painel-grid {
      display: grid;
      grid-template-columns: 280px minmax(220px, 1fr) 185px auto;
      grid-template-rows: auto auto;
      column-gap: 20px;
      row-gap: 6px;
      align-items: end;
      min-width: 760px;
    }

    .grid-label-tipo {
      grid-column: 1;
      grid-row: 1;
    }

    .grid-label-busca {
      grid-column: 2;
      grid-row: 1;
    }

    .grid-label-data {
      grid-column: 3;
      grid-row: 1;
    }

    .grid-campo-tipo {
      grid-column: 1;
      grid-row: 2;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 0;
    }

    .grid-campo-busca {
      grid-column: 2;
      grid-row: 2;
      display: flex;
      min-width: 0;
    }

    .grid-campo-data {
      grid-column: 3;
      grid-row: 2;
      position: relative;
      min-width: 0;
    }

    .painel-acoes {
      grid-column: 4;
      grid-row: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 1px;
    }

    .sinacor-label {
      font-size: 11px;
      color: var(--sinacor-label);
      font-weight: 500;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sinacor-input {
      box-sizing: border-box;
      background: var(--sinacor-input-bg);
      border: 1px solid #c5cad3;
      border-bottom: 2px solid var(--sinacor-input-border);
      border-radius: var(--sinacor-radius) var(--sinacor-radius) 0 0;
      padding: 4px 8px;
      font-size: 12px;
      color: #263238;
      outline: none;
      height: 30px;
      font-family: inherit;
    }

    .sinacor-input:focus {
      border-bottom-color: var(--sinacor-azul);
      background: #e3e7f0;
    }

    .tipo-select {
      width: 138px;
      flex-shrink: 0;
    }

    .residente-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-top: 1px;
    }

    .chk-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #455a64;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      line-height: 1.2;
    }

    .chk-item input[type='checkbox'] {
      width: 14px;
      height: 14px;
      margin: 0;
      accent-color: var(--sinacor-azul);
      cursor: pointer;
      flex-shrink: 0;
    }

    .busca-select {
      width: 100px;
      flex-shrink: 0;
      border-right: none;
      border-radius: var(--sinacor-radius) 0 0 0;
    }

    .busca-texto {
      flex: 1;
      min-width: 0;
      border-radius: 0 var(--sinacor-radius) 0 0;
    }

    .data-input {
      width: 100%;
      padding-right: 30px;
    }

    .data-icone {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 17px;
      width: 17px;
      height: 17px;
      color: var(--sinacor-label);
      pointer-events: none;
    }

    .btn-acao {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: var(--sinacor-radius);
      cursor: pointer;
      flex-shrink: 0;
    }

    .btn-limpar {
      color: var(--sinacor-azul);
      border: 1px solid #90caf9;
      background: #e3f2fd;
    }

    .btn-limpar:hover {
      background: #bbdefb;
    }

    .btn-fechar {
      color: #c62828;
      border: 1px solid #ef9a9a;
      background: #ffebee;
    }

    .btn-fechar:hover {
      background: #ffcdd2;
    }

    .btn-acao mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    @media (max-width: 1100px) {
      .painel-grid {
        min-width: 680px;
        grid-template-columns: 260px minmax(200px, 1fr) 170px auto;
      }
    }

    @media (max-width: 900px) {
      .painel-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
      }

      .grid-label-tipo,
      .grid-campo-tipo {
        grid-column: 1 / -1;
      }

      .grid-label-busca,
      .grid-campo-busca {
        grid-column: 1 / -1;
      }

      .grid-label-data,
      .grid-campo-data {
        grid-column: 1;
      }

      .painel-acoes {
        grid-column: 2;
        justify-content: flex-end;
      }
    }
  `,
})
export class ClienteFiltroPresenter {
  pesquisar = output<ClienteFiltro>();

  private readonly cdr = inject(ChangeDetectorRef);

  painelAberto = false;

  tipoPessoa: TipoPessoa | '' = '';
  tipoDocumento: '' | 'CPF' | 'CNPJ' = '';
  buscarPor: BuscarPor = 'nome';
  buscaTexto = '';
  dataUltimaAlteracao = '';
  dataExibicao = '';
  filtroResidente = false;
  filtroNaoResidente = false;

  private filtrosAplicados: ClienteFiltro = {};

  get chipsExibidos(): ChipFiltro[] {
    const base = this.painelAberto
      ? this.aplicarDraft()
      : this.filtrosAplicados;
    return this.montarChips(base);
  }

  atualizarView(): void {
    this.cdr.markForCheck();
  }

  onBuscarPorChange(): void {
    if (this.buscarPor === 'nome') {
      this.buscaTexto = this.filtrosAplicados.nomeCliente ?? '';
    } else {
      this.buscaTexto = this.filtrosAplicados.numeroDocumento ?? '';
    }
  }

  fecharPainel(): void {
    this.filtrosAplicados = this.aplicarDraft();
    this.painelAberto = false;
    this.cdr.markForCheck();
  }

  onDataChange(valor: string): void {
    const partes = valor.replace(/\D/g, '');
    if (partes.length === 8) {
      const dia = partes.slice(0, 2);
      const mes = partes.slice(2, 4);
      const ano = partes.slice(4, 8);
      this.dataUltimaAlteracao = `${ano}-${mes}-${dia}`;
    } else {
      this.dataUltimaAlteracao = '';
    }
    this.atualizarView();
  }

  onTipoPessoaChange(): void {
    if (this.tipoPessoa === 'PF') {
      this.tipoDocumento = 'CPF';
    } else if (this.tipoPessoa === 'PJ') {
      this.tipoDocumento = 'CNPJ';
    } else {
      this.tipoDocumento = '';
    }
  }

  togglePainel(): void {
    if (this.painelAberto) {
      this.filtrosAplicados = this.aplicarDraft();
      this.painelAberto = false;
    } else {
      this.carregarRascunho();
      this.painelAberto = true;
    }
  }

  onPesquisar(): void {
    this.filtrosAplicados = this.aplicarDraft();
    this.pesquisar.emit(this.filtrosAplicados);
  }

  limparFiltros(): void {
    this.tipoPessoa = '';
    this.tipoDocumento = '';
    this.buscarPor = 'nome';
    this.buscaTexto = '';
    this.dataUltimaAlteracao = '';
    this.dataExibicao = '';
    this.filtroResidente = false;
    this.filtroNaoResidente = false;
    this.filtrosAplicados = {};
    this.pesquisar.emit({});
    this.cdr.markForCheck();
  }

  removerChip(key: keyof ClienteFiltro): void {
    switch (key) {
      case 'tipoPessoa':
        this.tipoPessoa = '';
        this.tipoDocumento = '';
        break;
      case 'tipoDocumento':
        this.tipoDocumento = '';
        break;
      case 'numeroDocumento':
        this.buscaTexto = '';
        this.buscarPor = 'documento';
        break;
      case 'nomeCliente':
        this.buscaTexto = '';
        this.buscarPor = 'nome';
        break;
      case 'dataUltimaAlteracao':
        this.dataUltimaAlteracao = '';
        this.dataExibicao = '';
        break;
      case 'residente':
        this.filtroResidente = false;
        this.filtroNaoResidente = false;
        break;
    }
    this.onPesquisar();
  }

  private aplicarDraft(): ClienteFiltro {
    const result: ClienteFiltro = {
      ...this.filtrosAplicados,
      tipoPessoa: this.tipoPessoa || undefined,
      tipoDocumento: this.tipoDocumento || undefined,
      dataUltimaAlteracao: this.dataUltimaAlteracao || undefined,
      residente: this.resolverResidente(),
    };

    if (this.buscarPor === 'nome') {
      if (this.buscaTexto.trim()) {
        result.nomeCliente = this.buscaTexto.trim();
      } else {
        delete result.nomeCliente;
      }
    } else if (this.buscaTexto.trim()) {
      result.numeroDocumento = this.buscaTexto.trim();
    } else {
      delete result.numeroDocumento;
    }

    if (result.residente === null) {
      delete result.residente;
    }

    return result;
  }

  private montarFiltro(): ClienteFiltro {
    return this.aplicarDraft();
  }

  private resolverResidente(): boolean | null {
    if (this.filtroResidente && !this.filtroNaoResidente) {
      return true;
    }
    if (this.filtroNaoResidente && !this.filtroResidente) {
      return false;
    }
    return null;
  }

  private montarChips(filtros: ClienteFiltro): ChipFiltro[] {
    const chips: ChipFiltro[] = [];

    if (filtros.tipoPessoa) {
      chips.push({
        key: 'tipoPessoa',
        label: 'Tipo de Pessoa',
        valor: filtros.tipoPessoa === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica',
        obrigatorio: true,
        icone: 'texto',
      });
    }
    if (filtros.tipoDocumento) {
      chips.push({
        key: 'tipoDocumento',
        label: 'Tipo Documento',
        valor: filtros.tipoDocumento,
        icone: 'texto',
      });
    }
    if (filtros.numeroDocumento) {
      chips.push({
        key: 'numeroDocumento',
        label: 'Núm. Doc. Identificação',
        valor: filtros.numeroDocumento,
        icone: 'numero',
      });
    }
    if (filtros.nomeCliente) {
      chips.push({
        key: 'nomeCliente',
        label: 'Nome do Cliente',
        valor: filtros.nomeCliente,
        icone: 'texto',
      });
    }
    if (filtros.dataUltimaAlteracao) {
      chips.push({
        key: 'dataUltimaAlteracao',
        label: 'Data Última Alteração',
        valor: this.formatarData(filtros.dataUltimaAlteracao),
        icone: 'numero',
      });
    }
    if (filtros.residente === true) {
      chips.push({
        key: 'residente',
        label: 'Residente',
        valor: 'Sim',
        icone: 'texto',
      });
    }
    if (filtros.residente === false) {
      chips.push({
        key: 'residente',
        label: 'Residente',
        valor: 'Não',
        icone: 'texto',
      });
    }

    return chips;
  }

  private formatarData(isoDate: string): string {
    const [ano, mes, dia] = isoDate.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  private carregarRascunho(): void {
    const f = this.filtrosAplicados;
    this.tipoPessoa = f.tipoPessoa ?? '';
    this.tipoDocumento = f.tipoDocumento ?? '';
    this.dataUltimaAlteracao = f.dataUltimaAlteracao ?? '';
    this.dataExibicao = f.dataUltimaAlteracao
      ? this.formatarData(f.dataUltimaAlteracao)
      : '';
    this.filtroResidente = f.residente === true;
    this.filtroNaoResidente = f.residente === false;

    if (f.nomeCliente) {
      this.buscarPor = 'nome';
      this.buscaTexto = f.nomeCliente;
    } else if (f.numeroDocumento) {
      this.buscarPor = 'documento';
      this.buscaTexto = f.numeroDocumento;
    } else {
      this.buscaTexto = '';
    }
  }
}
