import { Component, ViewChild } from '@angular/core';

import { Network } from '@ionic-native/network';

import { Events, MenuController, Nav, Platform,App,ToastController } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { MyhubPage } from '../pages/myhub/myhub';
import { MessagesPage } from '../pages/messages/messages';
import { NotesPage } from '../pages/notes/notes';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { ShoppingListPage } from '../pages/shoppinglist/shoppingList';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  Logout?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
 
  @ViewChild(Nav) nav: Nav; 

  appPages: PageInterface[] = [
    { title: 'Dashboard', name: 'MyhubPage', component: MyhubPage, icon: 'md-home' },
    { title: 'DNA Report', name: 'ReportPage', component:'' , icon: 'ios-paper' },    
    { title: 'Messages', name: 'MessagesPage', component: MessagesPage, icon: 'md-chatboxes' },
    { title: 'Workouts', name: 'WorkoutPage', component: '', icon: 'md-document' },
    { title: 'Nutrition', name: 'NutritionPage', component: NutritionPage, icon: 'md-restaurant' },
    { title: 'Shopping List', name: 'ShoppingListPage', component:ShoppingListPage, icon: 'ios-cart' },
    { title: 'Measurements', name: 'MeasurementPage', component: '', icon: 'ios-barcode' },
    { title: 'Progress Photos', name: 'ProgressPage', component: '', icon: 'md-images' },
    { title: 'Calender', name: 'CalenderPage', component: '', icon: 'md-calendar' },
    { title: 'Notes', name: 'NotesPage', component: NotesPage, icon: 'ios-copy' },
    { title: 'Settings', name: 'SettingsPage', component: SettingsPage, icon: 'md-settings' }
  ];

  rootPage: any = LoginPage;
  logindata:any = {first_name:"",email:""};

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public app: App,
    private network: Network,
    private toastCtrl: ToastController,
    private inappbrowser: InAppBrowser
  ) {

    this.app.viewWillEnter.subscribe(() => { 

     this.network.onConnect().subscribe(()=>{ console.log("connected");});

      if(this.network.type == 'none' )
        this.connectivity_check();

      this.storage.get('userData').then((data) => {
        if(data){
          data = JSON.parse(data);
          this.logindata['first_name'] = data.first_name;
          this.logindata['email'] = data.email;
        }
      }); 
    });

    if(this.logindata.email && this.logindata.email != ""){
      this.nav.setRoot(MyhubPage);
    }

    this.platformReady();

    // load the conference data
    //confData.load();

    //this.listenToLoginEvents();
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    let params = {}; 

    if (page.index) {
      params = { tabIndex: page.index };
    }
  
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }

  shopurl(){
     this.inappbrowser.create("https://www.genomaxxfitness.com/shop","_blank");
  }

  logOut() {
      // Give the menu time to close before changing to logged out
      this.storage.remove('userData');
      this.enableMenu(false);
      this.nav.setRoot(LoginPage);

  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  connectivity_check(){
    const toast = this.toastCtrl.create({
      message: 'No internet connectionm available',
      duration: 4000
    });
    toast.present();
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
