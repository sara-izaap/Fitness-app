import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { AddchatPage } from '../addchat/addchat';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';

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

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public uservice: UserService,
        public globalVar:GlobalVars) {

       this.chaters = [
                       {id:"2", name:"GenoMaxx Fitness", avatar:"assets/img/cover__disclaimer.jpg"}
                      ];

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  goList( chater:any )
  {
    this.navCtrl.push(ChatPage, chater);
  }

  addNew()
  {
    this.navCtrl.push(AddchatPage, {id:"140000198202211138", name:'Ram'});
  }

}
