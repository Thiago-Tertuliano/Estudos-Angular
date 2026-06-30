import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { mockApiInterceptor } from '@core/interceptors/mock-api.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([mockApiInterceptor, authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_CONFIG,
      useValue: {
        appName: 'Angular Lab',
        apiUrl: '/api',
        production: false,
      },
    },
  ],
};
