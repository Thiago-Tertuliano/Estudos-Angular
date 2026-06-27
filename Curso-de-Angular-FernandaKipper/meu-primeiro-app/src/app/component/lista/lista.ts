import { Component, inject } from '@angular/core';
import { DadosService } from '../../services/dados.service';

@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  private readonly dadosService = inject(DadosService);
  readonly itens = this.dadosService.itensSignal;
  readonly totalItens = this.dadosService.itensSignal.length;
  readonly temItens = this.dadosService.itensSignal.length;

  adicionar() {
    this.dadosService.adicionarItem(`Item ${this.itens().length + 1}`);
  }

  remover(id: number) {
    this.dadosService.removerItem(id);
  }

  toggle(id: number) {
    this.dadosService.toggleStatus(id);
  }
}
