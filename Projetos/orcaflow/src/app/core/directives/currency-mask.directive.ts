import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
})
export class CurrencyMaskDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly control = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const value = +digits / 100;
    if (isNaN(value)) return;
    input.value = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    }
  }

  @HostListener('blur')
  onBlur() {
    const digits = this.el.nativeElement.value.replace(/\D/g, '');
    const value = +digits / 100;
    if (isNaN(value) || value === 0) {
      this.el.nativeElement.value = '';
      if (this.control?.control) this.control.control.setValue(null, { emitEvent: false });
    }
  }
}
