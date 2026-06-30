import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductCardComponent);
  });

  it('deve renderizar nome do produto', () => {
    fixture.componentRef.setInput('product', { id: '1', name: 'Mouse', price: 99 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Mouse');
  });

  it('deve emitir addToCart ao clicar em Adicionar', () => {
    fixture.componentRef.setInput('product', { id: '1', name: 'Mouse', price: 99 });
    fixture.detectChanges();

    const emitted: string[] = [];
    fixture.componentInstance.addToCart.subscribe((id) => emitted.push(id));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toEqual(['1']);
  });
});
