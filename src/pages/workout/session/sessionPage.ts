import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { GlobalVars } from '../../../providers/globalVars';
import { WorkoutService } from '../../../providers/workoutService';
import * as moment from 'moment';
import {LogWorkout} from '../log/logWorkout';

@Component({ selector:'page-sessionPage',templateUrl:'sessionPage.html'})
export class SessionPage {
  
  user_id:number;
  default_temp:any;
  my_temp:any;
  date:any = new Date();
  paramdata:any={date:'',time:'',followtemp:true,temp_id:'',user_id:''};

  constructor(public navCtrl:NavController,private globalVar:GlobalVars,public workservice:WorkoutService) {
    
    this.paramdata.date = moment(this.date).locale('es').format('YYYY-MM-DD');
    this.paramdata.time = moment(this.date).locale('es').format('HH:mm');
    console.log(this.paramdata.date);
  }
  ngOnInit(){
    
    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;
      this.paramdata.user_id = this.user_id;

      this.getTemplates();

    });
  }

  getTemplates(){

     this.workservice.getworkoutList(this.user_id).then(res =>{
        this.default_temp = res.assigned;
        this.my_temp = res.myworkout;
    })
    .catch(error => console.log(error));
  }

  startSession(){
    
    if((this.paramdata.followtemp && this.paramdata.temp_id) || this.paramdata.followtemp === false)
      this.navCtrl.push(LogWorkout,{data:this.paramdata});
  }
  
}
