import { TipoDocumento } from '@features/cadastro-clientes/models/cliente.model';

export function formatarDocumento(
  valor: string | number | null | undefined,
  tipo?: TipoDocumento | string | null,
): string {
  if (valor === null || valor === undefined || valor === '') {
    return '';
  }

  const digitos = String(valor).replace(/\D/g, '');
  if (!digitos) {
    return String(valor);
  }

  const tipoNormalizado = tipo?.toUpperCase();
  const isCnpj =
    tipoNormalizado === 'CNPJ' || (!tipoNormalizado && digitos.length > 11);

  if (isCnpj) {
    const cnpj = digitos.slice(0, 14).padStart(14, '0');
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }

  const cpf = digitos.slice(0, 11).padStart(11, '0');
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}
