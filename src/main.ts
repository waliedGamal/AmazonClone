import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, firebaseConfig } from './environments/environment';
import * as firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
const app = initializeApp(firebaseConfig);