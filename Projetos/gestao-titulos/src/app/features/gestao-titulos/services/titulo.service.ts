import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TituloFiltroDto } from '../models/dtos/titulo-filtro.dto';
import { Titulo } from '../models/titulo.model';
import { TituloStateService } from '../state/titulo-state.service';
import { TituloApiService } from './titulo-api.service';

@Injectable()
export class TituloService {
  private readonly api = inject(TituloApiService);
  private readonly state = inject(TituloStateService);

  async loadTitulos(filtros: TituloFiltroDto = {}): Promise<void> {
    try {
      this.state.setLoading(true);
      const data = await firstValueFrom(this.api.getTitulos(filtros));
      this.state.setData(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar títulos';
      this.state.setError(message);
      console.error('[TituloService]', error);
    } finally {
      this.state.setLoading(false);
    }
  }

  updateTitulo(titulo: Titulo): void {
    this.state.updateItem(titulo);
  }
}
