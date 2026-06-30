import { TestBed } from '@angular/core/testing';
import { TituloStateService } from './titulo-state.service';

describe('TituloStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('deve atualizar item na lista', () => {
    const service = TestBed.inject(TituloStateService);
    service.setData([
      {
        id: '1',
        nomeCliente: 'Ana',
        conta: '1',
        cpf: '111',
        dataCompra: '2026-01-01',
      },
    ]);

    service.updateItem({
      id: '1',
      nomeCliente: 'Ana Silva',
      conta: '1',
      cpf: '111',
      dataCompra: '2026-01-01',
    });

    expect(service.data()[0].nomeCliente).toBe('Ana Silva');
  });
});
