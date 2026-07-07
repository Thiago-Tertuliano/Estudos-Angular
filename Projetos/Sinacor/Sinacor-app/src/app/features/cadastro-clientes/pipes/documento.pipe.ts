import { Pipe, PipeTransform } from '@angular/core';
import { TipoDocumento } from '@features/cadastro-clientes/models/cliente.model';
import { formatarDocumento } from '@features/cadastro-clientes/utils/format-documento.util';

@Pipe({
  name: 'documento',
  standalone: true,
})
export class DocumentoPipe implements PipeTransform {
  transform(
    valor: string | null | undefined,
    tipo?: TipoDocumento | string | null,
  ): string {
    return formatarDocumento(valor, tipo);
  }
}
