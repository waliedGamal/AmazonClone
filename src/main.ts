import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { environment} from './environments/environment';
import { getAuth } from 'firebase/auth';
if (environment.production) {
  enableProdMode();
}

export const firebaseConfig = {
  apiKey: "AIzaSyDOuPuLJckbvsCGuHLIyXldSMhkT9AzDH8",
  authDomain: "clone-5bf01.firebaseapp.com",
  databaseURL: "https://clone-5bf01-default-rtdb.firebaseio.com",
  projectId: "clone-5bf01",
  storageBucket: "clone-5bf01.appspot.com",
  messagingSenderId: "359118066904",
  appId: "1:359118066904:web:b0ab25e60a57797ff0b3ad",
  measurementId: "G-19WEZ5NV27"
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);