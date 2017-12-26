import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';
import { PlansPage } from '../nutrition/plans/plans';
import {MeasurementPage} from '../measurement/measurement';
import {SessionPage} from '../workout/session/sessionPage';


@Component({
  selector: 'page-myhub',
  templateUrl: 'myhub.html'
})
export class MyhubPage {
 
  segment = 'start';
  activity:any={};
  nutrition:any;

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
            this.nutrition =  res.nutrition;
      })
      .catch(error => console.log(error));

    });

  }

  openmodule(type:string){

    let date:any = new Date();

    if(type == 'nutrition')
        this.navCtrl.push(PlansPage,date);

    if(type == 'measurement')
      this.navCtrl.push(MeasurementPage);

    if(type == 'workout')
      this.navCtrl.push(SessionPage);
      
    
  }

  
}
