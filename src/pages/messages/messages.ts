import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    chaters:any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
       this.chaters = [
                       {id:"140000198202211138", name:"GenoMaxx Fitness", avatar:"img/logo.png"},
                       {id:"140000198202211138", name:"Raja", avatar:"img/avatar-cher.png"}
                      ];
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  goList( chater:any )
  {
    console.log('IIIIIIIII');
    this.navCtrl.push(ChatPage, chater);
  }

  addNew()
  {
  	console.log('JJJ');
    this.navCtrl.push(ChatPage, {id:"140000198202211138", name:'Ram'});
  }

}
