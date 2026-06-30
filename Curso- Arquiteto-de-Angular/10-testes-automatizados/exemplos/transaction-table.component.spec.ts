import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableComponent } from './transaction-table.component';

describe('TransactionTableComponent', () => {
  let fixture: ComponentFixture<TransactionTableComponent>;
  let component: TransactionTableComponent;

  const mockTransactions = [
    { id: 'tx-1', description: 'Salário', amount: 5000, type: 'income' as const, date: '2026-06-01' },
    { id: 'tx-2', description: 'Aluguel', amount: 1500, type: 'expense' as const, date: '2026-06-05' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
  });

  it('deve renderizar linhas da tabela', () => {
    fixture.componentRef.setInput('transactions', mockTransactions);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('deve emitir delete ao clicar em excluir', () => {
    fixture.componentRef.setInput('transactions', mockTransactions);
    fixture.detectChanges();

    const spy = vi.fn();
    component.delete.subscribe(spy);

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalledWith('tx-1');
  });
});
