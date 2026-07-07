import { StatusInvestidor, TipoDocumento } from './cliente.model';

export type TipoPessoa = 'PF' | 'PJ';

export interface ClienteFiltro {
  tipoPessoa?: TipoPessoa | '';
  tipoDocumento?: TipoDocumento | '';
  numeroDocumento?: string;
  nomeCliente?: string;
  residente?: boolean | null;
  statusInvestidor?: StatusInvestidor | '';
  dataUltimaAlteracao?: string;
}
