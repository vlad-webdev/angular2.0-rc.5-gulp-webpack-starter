///<reference path="./_all.d.ts"/>

// import 'es6-shim';
// import 'jquery';
// import 'bootstrap';
// import 'reflect-metadata';
require('zone.js');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
