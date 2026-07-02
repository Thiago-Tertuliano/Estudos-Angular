import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mockApiInterceptor } from "@core/interceptors/mock-api.interceptor";
import { APP_CONFIG } from "@core/tokens/app-config.token";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: '/api',
        appName: 'Restaurant Front',
        production: false,
      },
    },
  ],
};
