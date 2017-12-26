import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CalendarModule } from "ion2-calendar";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import {TimeAgoPipe} from 'time-ago-pipe';

import { GenomaxxApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { MyhubPage } from '../pages/myhub/myhub';
import { MessagesPage } from '../pages/messages/messages';
import { NotesPage,ModalAddItemPage } from '../pages/notes/notes';
import { ChatPage } from '../pages/chat/chat';
import { AddchatPage } from '../pages/addchat/addchat';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { LognutplanPage } from '../pages/nutrition/lognutplan/lognutplan';
import { PlansPage,NgInitDirective } from '../pages/nutrition/plans/plans';
import { FoodlistPage } from '../pages/nutrition/food/foodList';
import {FoodaddPage} from '../pages/nutrition/foodadd/foodadd';
import {FoodviewPage} from '../pages/nutrition/foodview/foodview';
import {EditfoodPage} from '../pages/nutrition/foodedit/editfood';
import {ViewmacroPage} from '../pages/nutrition/macro/macro';
import { ShoppingListPage } from '../pages/shoppinglist/shoppingList';
import {MeasurementPage} from '../pages/measurement/measurement';
import {BodyfatcatPage} from '../pages/measurement/bodyfatcat/bodyfatcat';
import {WorkoutPage} from '../pages/workout/workoutPage';
import {WorkoutView} from '../pages/workout/view/workoutView';
import {Exerciseinfo} from '../pages/workout/exerciseinfo/exerciseinfo';
import {SafeHtmlPipe} from '../pages/workout/safeHtmlPipe';
import {WorkoutNote} from '../pages/workout/workoutNote';
import {SessionPage} from '../pages/workout/session/sessionPage';
import {LogWorkout} from '../pages/workout/log/logWorkout';
import {ContenteditableModel} from '../pages/workout/contenteditable-model';
import {Stopwatch} from '../pages/workout/timer/stopwatch';
import {AdddExercisePage} from "../pages/workout/addexercise/addExercise";
import {ReorderPage} from "../pages/workout/reorder/reorder";
import {HistoryPage} from "../pages/workout/history/history";

import {GlobalVars} from "../providers/globalVars";
import { UserService } from '../providers/userService';
import { AuthService } from '../providers/authService'; 
import { NoteService } from '../providers/noteService';
import { NutritionService } from '../providers/nutritionService';
import { WorkoutService } from '../providers/workoutService';

@NgModule({
  declarations: [
    GenomaxxApp,
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
    LognutplanPage,
    PlansPage,
    NgInitDirective,
    FoodlistPage,
    FoodaddPage,
    FoodviewPage,
    EditfoodPage,
    ViewmacroPage,
    ShoppingListPage,
    MeasurementPage,
    BodyfatcatPage,
    WorkoutPage,
    WorkoutView,
    Exerciseinfo,
    SafeHtmlPipe,
    WorkoutNote,
    SessionPage,
    LogWorkout,
    ContenteditableModel,
    Stopwatch,
    AdddExercisePage,
    ReorderPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(GenomaxxApp, {}, {
      links: [
            { component: LoginPage, name: 'LoginPage', segment: 'login' },
            { component: DisclaimerPage, name: 'Disclaimer', segment: 'disclaimer' },
            { component: MyhubPage, name: 'MyhubPage', segment: 'myhub' },
            { component: SettingsPage, name: 'SettingsPage', segment: 'settings' },
            { component: MessagesPage, name: 'MessagesPage', segment: 'messages' },
            { component: NotesPage, name: 'NotesPage', segment: 'notes' },
            { component: NutritionPage, name: 'NutritionPage', segment: 'Nutrition' },
            { component: ShoppingListPage, name: 'ShoppingListPage', segment: 'ShoppingList' },
            { component: MeasurementPage, name: 'MeasurementPage', segment: 'Measurements' },
            { component: WorkoutPage, name: 'WorkoutPage', segment: 'Workouts' } 
      ]
    }),
    IonicStorageModule.forRoot(),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GenomaxxApp,
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
    LognutplanPage,
    PlansPage,
    FoodlistPage,
    FoodaddPage,
    FoodviewPage,
    EditfoodPage,
    ViewmacroPage,
    ShoppingListPage,
    MeasurementPage,
    BodyfatcatPage,
    WorkoutPage,
    WorkoutView,
    Exerciseinfo,
    WorkoutNote,
    SessionPage,
    LogWorkout,
    Stopwatch,
    AdddExercisePage,
    ReorderPage,
    HistoryPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Network,
    GlobalVars,
    UserService,
    AuthService,
    NoteService,
    NutritionService,
    WorkoutService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { } 
