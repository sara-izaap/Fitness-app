import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';
import { NutritionPage } from '../nutrition/nutrition';
import { PlansPage } from '../nutrition/plans/plans';


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

  openmodule(){

    let type = 'nutrition';
    
    if(type == 'nutrition'){

      let date = new Date();

      if(this.nutrition)
        this.navCtrl.push(PlansPage,date);
      else
        this.navCtrl.push(NutritionPage);
    }

  }

  
}
