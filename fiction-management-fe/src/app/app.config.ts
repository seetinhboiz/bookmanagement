import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withJsonpSupport,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withJsonpSupport()),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
};
