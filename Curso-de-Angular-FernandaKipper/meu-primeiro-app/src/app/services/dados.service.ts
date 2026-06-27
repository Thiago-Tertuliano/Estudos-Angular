import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class DadosService {
  private readonly itens = signal<Item[]>([]);
  readonly itensSignal = this.itens.asReadonly();
  private nextId = 1;

  getItens() {
    return this.itens();
  }

  adicionarItem(nome: string) {
    this.itens.update(lista => [...lista, { id: this.nextId++, nome, status: 'pendente' }]);
  }

  removerItem(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));
  }

  toggleStatus(id: number) {
    this.itens.update(lista =>
      lista.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'ativo' ? 'inativo' : 'ativo' as const }
          : item
      )
    );
  }
}
