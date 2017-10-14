import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  	console.log(navParams.get('name'));
  	this.toUser = {
            id: navParams.get('id'),
            name: navParams.get('name')
        };
    this.user = {id:"210000198410281948", name:"Krish"};

    this.msgList = [
					    {
					      "messageId":"1",
					      "userId":"140000198202211138",
					      "userName":"Luff",
					      "userImgUrl":"./assets/user.jpg",
					      "toUserId":"210000198410281948",
					      "toUserName":"Hancock",
					      "userAvatar":"./assets/to-user.jpg",
					      "time":1488349800000,
					      "message":"A good programmer is someone who always looks both ways before crossing a one-way street. ",
					      "status":"success"

					    },
					    {
					      "messageId":"2",
					      "userId":"210000198410281948",
					      "userName":"Hancock",
					      "userImgUrl":"./assets/to-user.jpg",
					      "toUserId":"140000198202211138",
					      "toUserName":"Luff",
					      "userAvatar":"./assets/user.jpg",
					      "time":1491034800000,
					      "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
					      "status":"success"
					    },
					    {
					      "messageId":"3",
					      "userId":"140000198202211138",
					      "userName":"Luff",
					      "userImgUrl":"./assets/user.jpg",
					      "toUserId":"210000198410281948",
					      "toUserName":"Hancock",
					      "userAvatar":"./assets/to-user.jpg",
					      "time":1491034920000,
					      "message":"Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
					      "status":"success"
					    },
					    {
					      "messageId":"4",
					      "userId":"210000198410281948",
					      "userName":"Hancock",
					      "userImgUrl":"./assets/to-user.jpg",
					      "toUserId":"140000198202211138",
					      "toUserName":"Luff",
					      "userAvatar":"./assets/user.jpg",
					      "time":1491036720000,
					      "message":"One man’s crappy software is another man’s full time job.",
					      "status":"success"
					    }
					  ];
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

        // Mock message
        const id = Date.now().toString();
        let newMsg:any = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        console.log(id, newMsg);

        setTimeout(()=>{
        	console.log('(((((((((((((()))))))))))))))');
        	let index = this.getMsgIndexById(id);
            if (index !== -1) {
                this.msgList[index].status = 'success';
            }
        }, 3000)

        this.pushNewMsg(newMsg);
        this.editorMsg = '';

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }

        // this.chatService.sendMsg(newMsg)
        // .then(() => {
        //     let index = this.getMsgIndexById(id);
        //     if (index !== -1) {
        //         this.msgList[index].status = 'success';
        //     }
        // })
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
