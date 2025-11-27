import { Base_URl } from './shared/tokens/api.token';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, HttpInterceptorFn, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/Token/token-interceptor';
import { httpErrorInterceptor } from './core/interceptors/Error/http-error-interceptor';
import { MessageService } from 'primeng/api';
import { loaderInterceptor } from './core/interceptors/Loader/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
  MessageService
  
    
    ,provideHttpClient(withFetch(),withInterceptors([tokenInterceptor,httpErrorInterceptor,loaderInterceptor])),
    
     provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
