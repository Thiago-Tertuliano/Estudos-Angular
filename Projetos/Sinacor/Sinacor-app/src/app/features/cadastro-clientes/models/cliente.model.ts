export type TipoDocumento = 'CPF' | 'CNPJ';

export type StatusInvestidor = 'Ativo' | 'Inativo' | 'Bloqueado';

export interface Cliente {
  id: string;
  nomeCliente: string;
  residente: boolean;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  statusInvestidor: StatusInvestidor;
  dataHoraInclusao: string;
}
