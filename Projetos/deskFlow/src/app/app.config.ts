import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { mockApiInterceptor } from '@core/interceptors/mock-api.interceptor';
import { APP_CONFIG } from './core/tokens/app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([mockApiInterceptor, authInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: '/api',
        appName: 'DeskFlow',
        production: false,
      },
    },
  ],
};
