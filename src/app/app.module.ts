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
import { MessagesPage } from '../pages/messages/messages';
import { NotesPage,ModalAddItemPage } from '../pages/notes/notes';
import { ChatPage } from '../pages/chat/chat';
import { AddchatPage } from '../pages/addchat/addchat';


import {GlobalVars} from "../providers/globalVars";
import { UserService } from '../providers/userService';
import { AuthService } from '../providers/authService'; 
import { NoteService } from '../providers/noteService';


@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    MyhubPage,
    SettingsPage,
    DisclaimerPage,
    MessagesPage,
    NotesPage,
    ModalAddItemPage,
    ChatPage,
    AddchatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
            { component: LoginPage, name: 'LoginPage', segment: 'login' },
            { component: DisclaimerPage, name: 'Disclaimer', segment: 'disclaimer' },
            { component: MyhubPage, name: 'MyhubPage', segment: 'myhub' },
            { component: SettingsPage, name: 'SettingsPage', segment: 'settings' },
            { component: MessagesPage, name: 'MessagesPage', segment: 'messages' },
            { component: NotesPage, name: 'NotesPage', segment: 'notes' } 
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
    DisclaimerPage,
    MessagesPage,
    NotesPage,
    ModalAddItemPage,
    ChatPage,
    AddchatPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalVars,
    UserService,
    AuthService,
    NoteService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { } 
