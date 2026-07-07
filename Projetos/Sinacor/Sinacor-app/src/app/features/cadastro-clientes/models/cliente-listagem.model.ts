import { Cliente } from './cliente.model';

export interface ClienteListagem {
  items: Cliente[];
  total: number;
}
