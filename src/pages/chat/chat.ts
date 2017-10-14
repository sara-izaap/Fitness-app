import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	@ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;

	toUser:any;
	user:any;
	msgList:any =  [];
	editorMsg:any = '';
	showEmojiPicker:boolean = false;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public events: Events,
  		public uservice: UserService,
  		public globalVar:GlobalVars) {
	  	console.log(navParams.get('name'));
	  	
	  	this.toUser = {
	            id: navParams.get('id'),
	            name: navParams.get('name')
	        };

	    this.user = {};

	    this.globalVar.getUserdata().then((data) => {
      		data = JSON.parse(data);
      		console.log(data);
      		this.user.id = data.id;
      		this.user.name = data.first_name+' '+data.last_name;
      		this.getChats();

    	});

	}

	getChats()
	{
		this.uservice.get_chats(this.toUser.id).then(res =>{
	            //this.noteslist = res.data;
	            console.log(res.data);
	        
	        let data:any = res.data;

	        this.msgList = [];

	        for(let row in data )
	        {
	        	let temp:any = {
	        					"userId":data[row].from_id,
	        					"userName":data[row].from_name,
	        					"userImgUrl":"./assets/user.jpg",
	        					"toUserId":data[row].to_id,
						      	"toUserName":data[row].to_name,
						      	"userAvatar":"./assets/to-user.jpg",
						      	"time":data[row].created_time,
						      	"message": data[row].message,
						      	"status": "success"
	        					};
	        	console.log(row, temp);
	        	this.msgList.push(temp);
	        }

	        setTimeout(()=>{
        		this.scrollToBottom();
        	}, 500);

	      })
	      .catch(error => console.log(error));
	}

  	ionViewDidLoad() {
  	  console.log('ionViewDidLoad ChatPage');
  	}



  	onFocus() 
  	{
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    sendMsg() {
        if (!this.editorMsg.trim()) return;

        let newMsg:any = {
        	from_id: this.user.id,
        	to_id: this.toUser.id,
        	message: this.editorMsg,
        	time: Date.now()/1000
        };

        this.uservice.addChat(newMsg)
        .then((result) => {

        	console.log(result);
        	this.getChats();
            
        })

        

        //this.pushNewMsg(newMsg);
        this.editorMsg = '';

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
    }

    pushNewMsg(msg:any) 
    {
        const userId = this.user.id,
              toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) 
    {
        return this.msgList.findIndex((e:any) => e.messageId === id)
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
