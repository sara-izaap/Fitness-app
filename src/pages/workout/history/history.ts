import { Component } from '@angular/core';
import {NavController,NavParams,ViewController} from 'ionic-angular';
import { WorkoutService } from '../../../providers/workoutService';

@Component({ selector:'workout-history',templateUrl:'history.html'})
export class HistoryPage {
 
  segment='workout';  
  workout:any=[];
  allworkout:any=[];
  historydata:any;

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public viewCtrl: ViewController,
    public workservice:WorkoutService
  ) 
  { 
    this.historydata = this.params.get('data');
    console.log(this.historydata);
  }
  
  ngOnInit(){

    this.getWorkoutbyUser();
  }

  getWorkoutbyUser(){
  
    this.workservice.getworkoutByUser(this.historydata.user_id,this.historydata.exercise_id,this.historydata.temp_id).then(res =>{
        this.workout = res.currworkout;
        this.allworkout = res.allworkout;
        console.log(this.workout);
    })
    .catch(error => console.log(error));
  }

  dismiss(){
    this.viewCtrl.dismiss(false);   
  } 

  
}
