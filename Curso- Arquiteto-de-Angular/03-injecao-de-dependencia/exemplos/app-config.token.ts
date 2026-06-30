import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  appName: string;
  production: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  factory: () => ({
    apiUrl: '/api',
    appName: 'FinControl',
    production: false,
  }),
});
