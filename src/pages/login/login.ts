import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, LoadingController,AlertController, MenuController } from 'ionic-angular';

import { UserOptions } from '../../interfaces/user-options';

import { AuthService } from '../../providers/authService';

import { DisclaimerPage } from '../disclaimer/disclaimer';

import { GlobalVars } from '../../providers/globalVars';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  responsedata:any;

  constructor(public navCtrl: NavController,private loader:LoadingController,private menu: MenuController, public authService:AuthService,private alertCtrl: AlertController,private globalVar:GlobalVars) {
   }

  onLogin(form: NgForm) {

    let loading = this.loader.create({
        content: 'Loading...'
    });

    this.submitted = true;

    if (form.valid) {

      loading.present(); 

       this.authService.postData(this.login).then((result) => {

        loading.dismiss(); 
        this.responsedata = result;

        if(this.responsedata['status'] != undefined && this.responsedata['status'] == 'SUCCESS'){

            this.globalVar.setUserdata(JSON.stringify(this.responsedata['data'])); 
            this.navCtrl.setRoot(DisclaimerPage);

        }else{

          let alert = this.alertCtrl.create({
              title: 'Error',
              message: this.responsedata['message'],
              buttons: ['Ok'],
          });  
          alert.present();
        }
        

      }, (err) => {
        console.log(err);
      });


    }
  }


  ionViewWillEnter() {
    // the left menu should be disabled on the login page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the left menu when leaving the login page
    this.menu.enable(true);
  }
}
