import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './app/Interceptor/auth-interceptor.interceptor';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
