import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CalendarModule } from "ion2-calendar";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import {TimeAgoPipe} from 'time-ago-pipe';

import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { MyhubPage } from '../pages/myhub/myhub';
import { MessagesPage } from '../pages/messages/messages';
import { NotesPage,ModalAddItemPage } from '../pages/notes/notes';
import { ChatPage } from '../pages/chat/chat';
import { AddchatPage } from '../pages/addchat/addchat';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { PlansPage,NgInitDirective } from '../pages/nutrition/plans/plans';
import{ CalendarModalPage } from '../pages/nutrition/calendarModal';
import { FoodlistPage } from '../pages/nutrition/food/foodList';
import {FoodviewPage} from '../pages/nutrition/foodview/foodview';
import {EditfoodPage} from '../pages/nutrition/foodedit/editfood';


import {GlobalVars} from "../providers/globalVars";
import { UserService } from '../providers/userService';
import { AuthService } from '../providers/authService'; 
import { NoteService } from '../providers/noteService';
import { NutritionService } from '../providers/nutritionService';

@NgModule({
  declarations: [
    ConferenceApp,
    TimeAgoPipe,
    LoginPage,
    MyhubPage,
    SettingsPage,
    DisclaimerPage,
    MessagesPage,
    NotesPage,
    ModalAddItemPage,
    ChatPage,
    AddchatPage,
    NutritionPage,
    PlansPage,
    NgInitDirective,
    CalendarModalPage,
    FoodlistPage,
    FoodviewPage,
    EditfoodPage
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
            { component: NotesPage, name: 'NotesPage', segment: 'notes' },
            { component: NutritionPage, name: 'NutritionPage', segment: 'Nutrition' } 
      ]
    }),
    IonicStorageModule.forRoot(),
    CalendarModule
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
    AddchatPage,
    NutritionPage,
    PlansPage,
    CalendarModalPage,
    FoodlistPage,
    FoodviewPage,
    EditfoodPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Network,
    GlobalVars,
    UserService,
    AuthService,
    NoteService,
    NutritionService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { } 
