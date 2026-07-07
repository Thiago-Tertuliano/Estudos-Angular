import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { mockApiInterceptor } from '@core/interceptors/mock-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([mockApiInterceptor, authInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: '/api',
        appName: 'ProjControl',
        production: false,
      },
    },
  ],
};
