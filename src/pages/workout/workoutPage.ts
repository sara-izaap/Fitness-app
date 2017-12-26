import { Component} from '@angular/core';
import {NavController,NavParams,ToastController,Refresher,FabContainer} from 'ionic-angular';
import { GlobalVars } from '../../providers/globalVars';
import { WorkoutService } from '../../providers/workoutService';
import { WorkoutView } from './view/workoutView';
import {SessionPage} from './session/sessionPage';

@Component({ selector:'page-workout',templateUrl:'workout.html'})
export class WorkoutPage {
 
  segment='assigned';
  user_id:number;
  assigned:any;
  myworkout:any;
  assigneddata:any;
  myworkoutdata:any;
  searchKey:string = "";
  
  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public toastCtrl: ToastController,
    private globalVar:GlobalVars,
    public workservice:WorkoutService
  ) 
  {  }
  
  ngOnInit(){
     this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.getWorkoutList();

    });
  }

  onInput() {

    if(this.searchKey){
        this.assigned = this.findByName(this.searchKey,this.assigneddata);
        this.myworkout = this.findByName(this.searchKey,this.myworkoutdata);
    }else{   
        this.assigned = this.assigneddata;
        this.myworkout = this.myworkoutdata; 
    }    

  }

  findByName(key:string,data:any) {
     return data.filter((item:any) => {
        return item.name.toLowerCase().indexOf(key.toLowerCase()) > -1;           
    }); 
  }

  getWorkoutList(){
  
    this.workservice.getworkoutList(this.user_id).then(res =>{
        this.assigned = res.assigned;
        this.assigneddata = res.assigned;
        this.myworkout = res.myworkout;
        this.myworkoutdata = res.myworkout;
    })
    .catch(error => console.log(error));
  }

  viewworkout(id:number){
    this.navCtrl.push(WorkoutView,id);
  }

  StartSession(fab:FabContainer){
    fab.close(); 
    this.navCtrl.push(SessionPage);
  }

  doRefresh(refresher: Refresher) {

    this.workservice.getworkoutList(this.user_id).then(res =>{
        this.assigned = res.assigned;
        this.assigneddata = res.assigned;
        this.myworkout = res.myworkout;
        this.myworkoutdata = res.myworkout;

        setTimeout(() => {
            refresher.complete();

            const toast = this.toastCtrl.create({
              message: 'workouts have been updated.',
              duration: 3000
            });
            toast.present();
        }, 1000);
    })
    .catch(error => console.log(error));
   
   }
  
}
