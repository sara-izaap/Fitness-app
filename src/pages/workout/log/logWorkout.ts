import { Component,NgZone } from '@angular/core';
import {NavController,NavParams,AlertController,ModalController,ActionSheetController,LoadingController} from 'ionic-angular';
import { WorkoutService } from '../../../providers/workoutService';
import { MyhubPage } from '../../myhub/myhub';
import {WorkoutNote} from '../workoutNote';
import {Exerciseinfo} from '../exerciseinfo/exerciseinfo';
import {Stopwatch} from "../timer/stopwatch";
import {AdddExercisePage} from "../addexercise/addExercise";
import {ReorderPage} from "../reorder/reorder";
import {HistoryPage} from "../history/history";

@Component({ selector:'page-logWorkout',templateUrl:'logWorkout.html'})
export class LogWorkout {
  userdata:any;
  workoutData:any=[];
  notes:string;
  activated:boolean=false;
  isEditable:boolean=false;
  finishWorkout:boolean=false;
  workout_notes:string="";
  temp_title:string="";
  followtemp:boolean=false;

  constructor(
    public navCtrl:NavController,
    public params:NavParams,
    private zonedetect:NgZone,
    public alertCtrl:AlertController,
    public actionSheetCtrl:ActionSheetController,
    public loader: LoadingController,
    public modalCtrl: ModalController,
    public workservice:WorkoutService
    ){
      this.userdata = this.params.get('data');
    }

  ngOnInit(){
    
    if(this.userdata.followtemp === true)
      this.getWorkoutdata();
    else
      this.activated = true;
    
  }

  getWorkoutdata(){

    this.workservice.getWorkoutData(this.userdata.temp_id).then(res =>{
        this.activated = true;
        this.workoutData = res.data;
        this.notes = res.notes;
        console.log(this.workoutData);
    })
    .catch(error => console.log(error));
  }

  OpenNote(type:string,item:any){

   let heading:string = ""; 

   if(type == 'exercise'){
      this.notes = item.notes;
      heading = item.exercise_name;
    }  


   let workoutnote =  this.modalCtrl.create(WorkoutNote,{note:this.notes,title:heading});

    workoutnote.present();
  } 

  ExerciseInfo(item:any){

   let param:any = {id:item.exercise_id,name:item.exercise_name};

   let exerciseinfo =  this.modalCtrl.create(Exerciseinfo,{exercise:param});

    exerciseinfo.present();
  } 

  setEditVal(exercise:number,data:any,row:any,pos:any,val:any){

    var ex = this.workoutData[exercise];

    if(ex){
      var v = ex['data'][data][row].split(":");
      var p ="";
      for(var i=0;i<v.length;i++){
        if(i==1)
          p += ":";
        if(i==pos)
          p += val;

        if(i!= pos)
          p += v[i];
      }
      this.workoutData[exercise]['data'][data][row] = p;
    }
  }

  selectNum(event:any){
    event.target.select();
  }

  AddSet(pos:any,exercise_id:number,set_type:string){

    this.zonedetect.run(() => {

      let ex:any = this.workoutData[pos];

      if(ex['data'].length > 0 && exercise_id == ex.exercise_id && set_type=='Set'){

        let newset:any[] = Object.assign([],this.workoutData[pos]['data'].slice(-1)[0]);
       
        this.workoutData[pos]['data'].push(newset);
      }
      else
      {
          let defaldata:any[] = this.workoutData[pos]['default_data'];

          if(set_type=='Set' && defaldata instanceof Array && defaldata.length > 0){          

            defaldata = defaldata[0];           

            this.workoutData[pos]['data'].push(Object.assign([],defaldata));      
          }

          let rounddata:any[] = this.workoutData[pos]['default_data'];

          if(set_type=='Round' && rounddata instanceof Array && rounddata.length > 0){ 

            let rowdata:any[] = this.workoutData[pos]['data'];            
             
             this.workoutData[pos]['data'] = [...rowdata,...rounddata];
          }
      }

    });
  }

  DeleteSet(exercise:number,pos:any){

     const setalert = this.alertCtrl.create({
      title: 'Remove Set',
      message: 'Do You want to remove set #' + (pos+1) + ' from ' + this.workoutData[exercise].exercise_name + '?',
      buttons: [
        {
          text: 'CANCEL',role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'CONFIRM',
          handler: () => { 

            const index:number = this.workoutData[exercise]['data'].indexOf(pos);
            if (index === -1) 
              this.workoutData[exercise]['data'].splice(index, 1);
          }
        }
      ]
    });
    setalert.present();
  } 

  DeleteExercise(pos:any){
    
    const exercisealert = this.alertCtrl.create({
      title: 'Remove Exercise',
      message: 'Do You want to remove ' + this.workoutData[pos].exercise_name + '?',
      buttons: [
        {
          text: 'CANCEL',role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'CONFIRM',
          handler: () => { 

            if(this.workoutData[pos] instanceof Object)
              this.workoutData.splice(pos, 1);
          }
        }
      ]
    });
    exercisealert.present();

  }

  Reorder(){

      let reorderExercise =  this.modalCtrl.create(ReorderPage,{data:this.workoutData});
      reorderExercise.present(); 

      reorderExercise.onDidDismiss(data => {
        if(data && data instanceof Object){
          this.workoutData = data;
        }
      })
  } 

  Timer(){

   let timerinfo =  this.modalCtrl.create(Stopwatch);

    timerinfo.present(); 
  }

  AddExercise(){

    let addexercise =  this.modalCtrl.create(AdddExercisePage);
    addexercise.present(); 

    addexercise.onDidDismiss(data => {
      if(data && data instanceof Object){

        let exedata:any = Object.assign({},data);
        this.workoutData.push(exedata);
      }
    })
  }

  History(item:any){

    let paramdata:any = {user_id:this.userdata.user_id,exercise_id:item.exercise_id,temp_id:this.userdata.temp_id,name:item.exercise_name}
    let exercisehistory =  this.modalCtrl.create(HistoryPage,{data:paramdata});
    exercisehistory.present(); 

  }

  SaveWorkout(){

    if(this.followtemp === true && !this.temp_title)
      return false;

      let loading = this.loader.create();

      loading.present();

      let postdata:any = {user_id:this.userdata.user_id,date:this.userdata.date,time:this.userdata.time,data:this.workoutData,name:this.temp_title,followtemp:this.followtemp,temp_id:this.userdata.temp_id,notes:this.workout_notes};

      this.workservice.SaveWorkout(postdata).then(res =>{
          console.log(res);
          loading.dismiss();
          this.navCtrl.setRoot(MyhubPage);
      })
      .catch(error => console.log(error));
  }

  dismiss(){

     const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Please confirm that you want to quit this session - Any data logged during the session will be cleared.',
      buttons: [
        {
          text: 'CANCEL',role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'QUIT SESSION',
          handler: () => {
            this.navCtrl.setRoot(MyhubPage);
          }
        }
      ]
    });
    alert.present();
  }
  
}
