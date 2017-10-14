import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';
/**
 * Generated class for the AddchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addchat',
  templateUrl: 'addchat.html',
})
export class AddchatPage {
	@ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;

    editorMsg:any = '';
	showEmojiPicker:boolean = false;

	toUser:any;
	fromUser:any;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public events: Events, 
  		public uservice: UserService,
  		public globalVar:GlobalVars) {

  		this.globalVar.getUserdata().then((data) => {
	    	this.fromUser = JSON.parse(data);
	    });

  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AddchatPage');
  	}

  	onFocus() 
  	{
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    sendMsg() {
        if (!this.editorMsg.trim()) return;

        console.log(this.editorMsg, this.toUser, this.fromUser);

        

        let newMsg:any = {
        	from_id: this.fromUser.id,
        	to_id: this.toUser,
        	message: this.editorMsg,
        	time: Date.now()/1000
        };

        this.editorMsg = '';

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }

        this.uservice.addChat(newMsg)
        .then((result) => {

        	console.log(result);
        	this.navCtrl.push(ChatPage, {id:this.toUser, name:"GenoMaxx Fitness"});
            
        })
    }

    

  	scrollToBottom() 
  	{
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

}
