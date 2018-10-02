import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
   const script = document.createElement('script')
   script.setAttribute('src', 'http://localhost:35729/livereload.js')
   document.body.appendChild(script)
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
