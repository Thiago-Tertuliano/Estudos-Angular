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
});
