import { provideHttpClient } from '@angular/common/http';
import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
