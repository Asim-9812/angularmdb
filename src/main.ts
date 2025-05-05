/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/route';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './env/environment';


bootstrapApplication(
  AppComponent, 
  {providers: [
    provideProtractorTestingSupport(),
    provideFirebaseApp(() => initializeApp(environment.firebase),
    provideAuth(() => getAuth())),
     provideRouter(routeConfig)]}).catch((err) =>
  console.error(err),
);
