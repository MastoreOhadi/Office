import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth-guard.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(), // فراهم کردن HttpClient
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // افزودن Interceptor
    AuthGuard,


  ]
};

