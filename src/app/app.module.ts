import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { MyhubPage } from '../pages/myhub/myhub';

import {GlobalVars} from "../providers/globalVars";
import { UserService } from '../providers/userService';
import { AuthService } from '../providers/authService';


@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    MyhubPage,
    SettingsPage,
    DisclaimerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
            { component: LoginPage, name: 'LoginPage', segment: 'login' },
            { component: DisclaimerPage, name: 'Disclaimer', segment: 'disclaimer' },
            { component: MyhubPage, name: 'MyhubPage', segment: 'myhub' },
            { component: SettingsPage, name: 'SettingsPage', segment: 'settings' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    LoginPage,
    MyhubPage,
    SettingsPage,
    DisclaimerPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalVars,
    UserService,
    AuthService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
