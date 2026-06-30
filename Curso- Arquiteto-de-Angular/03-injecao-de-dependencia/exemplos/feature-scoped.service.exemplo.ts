import { Component, Injectable } from '@angular/core';

/**
 * Provider no nível do componente = nova instância por componente.
 * Use para estado isolado (ex: wizard multi-step, form session).
 */
@Injectable()
export class WizardStateService {
  private step = 0;

  next(): void {
    this.step++;
  }

  getStep(): number {
    return this.step;
  }
}

@Component({
  selector: 'app-wizard',
  standalone: true,
  providers: [WizardStateService], // escopo limitado ao wizard
  template: `<p>Step: {{ state.getStep() }}</p>`,
})
export class WizardComponent {
  constructor(readonly state: WizardStateService) {}
}
