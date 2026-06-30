import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TituloFiltroDto } from '../models/dtos/titulo-filtro.dto';
import { Titulo } from '../models/titulo.model';

const MOCK_TITULOS: Titulo[] = [
  {
    id: '1',
    nomeCliente: 'Ana Silva',
    conta: '12345-6',
    cpf: '123.456.789-00',
    dataCompra: '2026-01-15',
  },
  {
    id: '2',
    nomeCliente: 'Bruno Costa',
    conta: '98765-4',
    cpf: '987.654.321-11',
    dataCompra: '2026-02-20',
  },
  {
    id: '3',
    nomeCliente: 'Carla Mendes',
    conta: '55555-1',
    cpf: '456.789.123-22',
    dataCompra: '2026-03-10',
  },
  {
    id: '4',
    nomeCliente: 'Diego Alves',
    conta: '11111-9',
    cpf: '321.654.987-33',
    dataCompra: '2026-03-25',
  },
];

@Injectable({ providedIn: 'root' })
export class TituloApiService {
  getTitulos(filtros: TituloFiltroDto = {}): Observable<Titulo[]> {
    const nome = filtros.nomeCliente?.toLowerCase().trim() ?? '';
    const conta = filtros.conta?.trim() ?? '';
    const cpf = filtros.cpf?.replace(/\D/g, '') ?? '';
    const data = filtros.dataCompra?.trim() ?? '';

    const result = MOCK_TITULOS.filter((titulo) => {
      const matchNome = !nome || titulo.nomeCliente.toLowerCase().includes(nome);
      const matchConta = !conta || titulo.conta.includes(conta);
      const matchCpf = !cpf || titulo.cpf.replace(/\D/g, '').includes(cpf);
      const matchData = !data || titulo.dataCompra === data;
      return matchNome && matchConta && matchCpf && matchData;
    });

    return of(result).pipe(delay(400));
  }
}
