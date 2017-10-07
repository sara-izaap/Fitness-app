import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';


@Component({
  selector: 'page-myhub',
  templateUrl: 'myhub.html'
})
export class MyhubPage {
 
  segment = 'start';
  activity:any={};

  constructor(
    public navCtrl: NavController,
    public userservice:UserService,
    private globalVar:GlobalVars
  ) 
  {
    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      
      this.userservice.get_activities(data.id).then(res =>{
            this.activity = res.data;
      })
      .catch(error => console.log(error));

    });

  }

  
}
