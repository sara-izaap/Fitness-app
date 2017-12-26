import { Component} from '@angular/core';
import {NavController,NavParams,ModalController} from 'ionic-angular';
import { WorkoutService } from '../../../providers/workoutService';
import {Exerciseinfo} from '../exerciseinfo/exerciseinfo';
import {WorkoutNote} from '../workoutNote';

@Component({ selector:'page-workoutView',templateUrl:'workoutView.html'})
export class WorkoutView {
 
  workout:any;
  workoutData:any;
  notes:any;

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public modalCtrl: ModalController,
    public workservice:WorkoutService
  ) 
  { 
    this.workout = this.params.data;
  }
  
  ngOnInit(){
     this.workservice.getWorkoutData(this.workout.id).then(res =>{
        this.workoutData = res.data;
        this.notes = res.notes;

    })
    .catch(error => console.log(error));
  }

  ExerciseInfo(item:any){

   let param:any = {id:item.exercise_id,name:item.exercise_name};

   let exerciseinfo =  this.modalCtrl.create(Exerciseinfo,{exercise:param});

    exerciseinfo.present();
  }  
  
  OpenNote(){

   let workoutnote =  this.modalCtrl.create(WorkoutNote,{note:this.notes});

    workoutnote.present();
  }  
}
