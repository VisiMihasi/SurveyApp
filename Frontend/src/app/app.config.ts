// app/app.config.ts
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  production: boolean;
  apiEndpoint: string;
  appTitle: string;
  featureFlags: {
    enableNewFeature: boolean;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api',
  appTitle: 'My Angular App',
  featureFlags: {
    enableNewFeature: true,
  }
};
