import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableComponent } from './transaction-table.component';

describe('TransactionTableComponent', () => {
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTableComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TransactionTableComponent);
  });

  it('deve renderizar descrição da transação', () => {
    fixture.componentRef.setInput('transactions', [
      {
        id: '1',
        description: 'Salário',
        amount: 5000,
        type: 'income',
        categoryId: 'c1',
        date: '2026-01-15',
      },
    ]);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Salário');
  });

  it('deve emitir delete ao clicar em Excluir', () => {
    fixture.componentRef.setInput('transactions', [
      {
        id: 'tx-1',
        description: 'Mercado',
        amount: 200,
        type: 'expense',
        categoryId: 'c2',
        date: '2026-01-10',
      },
    ]);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const deleted: string[] = [];
    fixture.componentInstance.delete.subscribe((id) => deleted.push(id));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button.danger');
    button.click();
    expect(deleted).toEqual(['tx-1']);
  });
});
