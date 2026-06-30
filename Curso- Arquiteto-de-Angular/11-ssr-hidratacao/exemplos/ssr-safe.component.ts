import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ssr-safe-widget',
  standalone: true,
  template: `
    @if (chartReady()) {
      <canvas id="chart"></canvas>
    } @else {
      <p>Gráfico disponível após carregar no browser.</p>
    }
  `,
})
export class SsrSafeWidgetComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly chartReady = signal(false);

  ngAfterViewInit(): void {
    // Chart.js/D3 só rodam no browser — nunca no Node do SSR
    if (isPlatformBrowser(this.platformId)) {
      this.initChart();
      this.chartReady.set(true);
    }
  }

  private initChart(): void {
    // import('chart.js').then(...) — dynamic import reduz bundle SSR
  }
}
