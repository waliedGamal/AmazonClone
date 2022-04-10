import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import 'localstorage-polyfill';
global['localStorage'] = localStorage;

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    // ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
@Injectable()
export class AppServerModule {
  constructor(@Inject(DOCUMENT) private _doc: Document) {}
  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  getLocation(): Location {
    return this._doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this._doc.createElement(tag);
  }
}
