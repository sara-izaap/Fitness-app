import { Component, ViewChild } from '@angular/core';

import { List, LoadingController } from 'ionic-angular';

import { GlobalVars } from '../../providers/globalVars';
import { UserService } from '../../providers/userService';


@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  segment = 'account';
  account: any = {};
  tracks: Array<{name: string, attribute: string, isChecked: boolean}> = [];
  emailtracks: Array<{name: string, attribute: string, isChecked: boolean,delivery:number}> = [];
  delivery_slots:any;

  constructor(
    public loader: LoadingController,
    public globalVar:GlobalVars,
    public userservice:UserService
  ) {

      this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      
        this.userservice.get_notifications(data.id).then(res =>{
            this.account = res.account;
            this.delivery_slots = res.deliver_slot;

            this.notification_defaults(res);
        })
        .catch(error => console.log(error));
      });  

  }

  notification_defaults(data:any){

    let notification = data['notification'];
    
    this.tracks = [
                  {name:'New Messages',attribute:'new_message',isChecked:this.checkboolean(notification,'new_message')},
                  {name:'Session Booked',attribute:'session_booked',isChecked:this.checkboolean(notification,'session_booked')},
                  {name:'Session Edited',attribute:'session_edited',isChecked:this.checkboolean(notification,'session_edited')},
                  {name:'Session Cancel request',attribute:'session_cancel_request',isChecked:this.checkboolean(notification,'session_cancel_request')},
                  {name:'Session Cancelled',attribute:'session_cancelled ',isChecked:this.checkboolean(notification,'session_cancelled')},
                  {name:'Schedule AM Workout Rremainder',attribute:'schedule_am_workout_remainder', isChecked:this.checkboolean(notification,'schedule_am_workout_remainder')},
                  {name:'Schedule PM Workout Rremainder',attribute:'schedule_pm_workout_remainder', isChecked:this.checkboolean(notification,'schedule_pm_workout_remainder')},
                  {name:'Remainder log nutrition',attribute:'remainder_log_nutrition',isChecked:this.checkboolean(notification,'remainder_log_nutrition')},
                  {name:'Remainder update measurement',attribute:'remainder_update_measurement', isChecked:this.checkboolean(notification,'remainder_update_measurement')},
                  {name:'Remainder to update progress photo',attribute:'remainder_update_progress_photo', isChecked:this.checkboolean(notification,'remainder_update_progress_photo')},
                  {name:'New schedule',attribute:'new_schedule',isChecked:this.checkboolean(notification,'new_schedule')} 
                  ];

     let emailnot = data['emailalerts'];
                  
     this.emailtracks = [
                  {name:'New Messages',attribute:'new_message_type',isChecked:this.checkboolean(emailnot,'new_message'),delivery:1},
                  {name:'Session Booked',attribute:'session_booked_type',isChecked:this.checkboolean(emailnot,'session_booked'),delivery:2},
                  {name:'Session Edited',attribute:'session_edited_type',isChecked:this.checkboolean(emailnot,'session_edited'),delivery:3},
                  {name:'Session Cancelled',attribute:'session_cancelled_type',isChecked:this.checkboolean(emailnot,'session_cancelled'),delivery:1},
                  {name:'Purchased package',attribute:'purchased_package_type', isChecked:this.checkboolean(emailnot,'purchased_package'),delivery:2},
                  {name:'Package expired ',attribute:'package_expired_type', isChecked:this.checkboolean(emailnot,'package_expired'),delivery:1},
                  {name:'Package low session remaining ',attribute:'package_low_session_remaining_type', isChecked:this.checkboolean(emailnot,'package_low_session_remaining'),delivery:1},
                  {name:'Custom form',attribute:'custom_form_type', isChecked:this.checkboolean(emailnot,'custom_form'),delivery:2} 
                  ];              

  }

  checkboolean(data:any,index:string){

    if(data){
      var val = (data[index]=='1')?true:false;
      return val;
    }  
     else
      return true;  
  }

  onSubmit() {

      let loading = this.loader.create();

      loading.present();

      this.userservice.saveaccount(this.account).then((result) => {

        loading.dismiss();
        console.log(result);

      });
   
  }

   notificationSave(){

    let loading = this.loader.create();

    loading.present();

    let push_notify:any = {};
    for(let data of this.tracks) {
       push_notify[data.attribute] = (data.isChecked)?1:0;
    }

    let email_notify:any = {};
    for(let data of this.emailtracks) {
       email_notify[data.attribute+'val'] = (data.isChecked)?1:0;
       email_notify[data.attribute] = data.delivery;
    }

    let summary:any = {...push_notify, ...email_notify};

    summary['user_id'] = this.account.id;

    //console.log(summary);

    this.userservice.savenotification(summary).then((result) => {

      loading.dismiss();
      console.log(result);

    });   

  } 

}
