import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import { UserService } from '../../providers/userService';
import { GlobalVars } from '../../providers/globalVars';
import { PlansPage } from '../nutrition/plans/plans';
import {MeasurementPage} from '../measurement/measurement';
import {SessionPage} from '../workout/session/sessionPage';
import {ProgressPicPage} from "../progresspic/progressPic";
import { WorkoutView } from '../workout/view/workoutView';


@Component({
  selector: 'page-myhub',
  templateUrl: 'myhub.html'
})
export class MyhubPage {
 
  segment = 'start';
  activity:any={};
  gmtplus:any;
  custname:string;

  constructor(
    public navCtrl: NavController,
    public userservice:UserService,
    private globalVar:GlobalVars
  ) 
  {
    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);

      this.custname = data.first_name;
      
      this.userservice.get_activities(data.id).then(res =>{
            this.activity = res.data;
      })
      .catch(error => console.log(error));

    });

    this.gmtplus =  5*24*60*60;

  }

  openmodule(type:string){

    let date:any = new Date();

    switch(type) { 

      case "nutrition": 
          this.navCtrl.push(PlansPage,date); 
          break; 
        
      case "measurement":  
          this.navCtrl.push(MeasurementPage);
          break; 
        
      case "workout":
          this.navCtrl.push(SessionPage);
          break;    
        
      case "progress":
          this.navCtrl.push(ProgressPicPage);
          break; 
         
      default:  
          console.log("Invalid choice"); 
          break;              
        
    }      
    
  }

  openLog(data:any,type:string){

    switch(type) { 

      case "nutrition": 
          let date:any = new Date(data.action_date);
          this.navCtrl.push(PlansPage,date); 
          break; 
        
      case "measurement":  
          this.navCtrl.push(MeasurementPage,{id:data.action_id,type:data.sub_type});
          break; 
        
      case "workout":
          this.navCtrl.push(WorkoutView,{id:data.action_id});
          break;    
        
      case "progress":
          this.navCtrl.push(ProgressPicPage);
          break; 
         
      default:  
          console.log("Invalid choice"); 
          break;              
        
    }      
  }

  
}
