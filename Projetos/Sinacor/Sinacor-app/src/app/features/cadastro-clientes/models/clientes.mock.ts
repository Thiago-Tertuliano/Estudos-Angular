import { Cliente, StatusInvestidor } from './cliente.model';

const STATUS: StatusInvestidor[] = ['Ativo', 'Inativo', 'Bloqueado'];
const NOMES = [
  'Maria Silva',
  'Tech Investimentos Ltda',
  'João Pereira',
  'Ana Costa',
  'Bruno Mendes',
  'Carla Souza',
  'Diego Alves',
  'Elena Ribeiro',
];

function gerarClientesMock(): Cliente[] {
  return Array.from({ length: 50 }, (_, index) => {
    const isCnpj = index % 7 === 0;
    const nomeBase = NOMES[index % NOMES.length];

    return {
      id: String(index + 1),
      nomeCliente: index < 3 ? nomeBase : `${nomeBase} ${index + 1}`,
      residente: index % 3 !== 0,
      tipoDocumento: isCnpj ? 'CNPJ' : 'CPF',
      numeroDocumento: isCnpj
        ? String(12345678000000 + index).padStart(14, '0')
        : String(12345678900 + index).padStart(11, '0'),
      statusInvestidor: STATUS[index % STATUS.length],
      dataHoraInclusao: new Date(
        2024,
        index % 12,
        (index % 28) + 1,
        9 + (index % 8),
        15,
      ).toISOString(),
    };
  });
}

export const CLIENTES_MOCK: Cliente[] = gerarClientesMock();
