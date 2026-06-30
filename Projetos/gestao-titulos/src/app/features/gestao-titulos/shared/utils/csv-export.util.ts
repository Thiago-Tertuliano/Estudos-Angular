import { Titulo } from '../../models/titulo.model';

export function exportTitulosToCsv(titulos: Titulo[], filename = 'titulos.csv'): void {
  const headers = ['Nome Cliente', 'Conta', 'CPF', 'Data da Compra'];
  const rows = titulos.map((t) => [t.nomeCliente, t.conta, t.cpf, t.dataCompra]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
