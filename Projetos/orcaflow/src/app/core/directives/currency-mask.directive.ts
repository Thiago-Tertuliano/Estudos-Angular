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
  onInput(event: InputEvent) {
    const raw = this.el.nativeElement.value.replace(/\D/g, '');
    const value = +raw / 100;
    if (isNaN(value)) return;
    const formatted = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.el.nativeElement.value = formatted;
    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    }
    event.stopPropagation();
  }

  @HostListener('blur')
  onBlur() {
    const raw = this.el.nativeElement.value.replace(/\D/g, '');
    const value = +raw / 100;
    if (isNaN(value) || value === 0) {
      this.el.nativeElement.value = '';
      if (this.control?.control) this.control.control.setValue(null, { emitEvent: false });
    }
  }
}
