import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ClienteFiltro } from '../models/cliente-filtro.model';
import { ClienteListagem } from '../models/cliente-listagem.model';
import { CLIENTES_MOCK } from '../models/clientes.mock';

@Injectable()
export class ClienteApiService {
  listar(
    filtros: ClienteFiltro = {},
    pageIndex = 0,
    pageSize = 10,
  ): Observable<ClienteListagem> {
    const nome = filtros.nomeCliente?.toLowerCase().trim() ?? '';
    const documento = filtros.numeroDocumento?.replace(/\D/g, '') ?? '';
    const status = filtros.statusInvestidor ?? '';
    const tipoPessoa = filtros.tipoPessoa ?? '';
    const tipoDocumento = filtros.tipoDocumento ?? '';
    const dataAlteracao = filtros.dataUltimaAlteracao ?? '';
    const residente = filtros.residente;

    const filtrados = CLIENTES_MOCK.filter((cliente) => {
      const matchNome =
        !nome || cliente.nomeCliente.toLowerCase().includes(nome);

      const matchDocumento =
        !documento ||
        cliente.numeroDocumento.replace(/\D/g, '').includes(documento);

      const matchStatus = !status || cliente.statusInvestidor === status;

      const matchTipoDoc =
        !tipoDocumento || cliente.tipoDocumento === tipoDocumento;

      const matchTipoPessoa =
        !tipoPessoa ||
        (tipoPessoa === 'PF' && cliente.tipoDocumento === 'CPF') ||
        (tipoPessoa === 'PJ' && cliente.tipoDocumento === 'CNPJ');

      const matchResidente =
        residente === null ||
        residente === undefined ||
        cliente.residente === residente;

      const dataCliente = cliente.dataHoraInclusao.slice(0, 10);
      const matchData = !dataAlteracao || dataCliente === dataAlteracao;

      return (
        matchNome &&
        matchDocumento &&
        matchStatus &&
        matchTipoDoc &&
        matchTipoPessoa &&
        matchResidente &&
        matchData
      );
    });

    const inicio = pageIndex * pageSize;
    const items = filtrados.slice(inicio, inicio + pageSize);

    return of({ items, total: filtrados.length }).pipe(delay(400));
  }
}
