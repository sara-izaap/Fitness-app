import { Component} from '@angular/core';
import {NavController,NavParams,ViewController,reorderArray} from 'ionic-angular';

@Component({ selector:'page-reorderexercise',templateUrl:'reorder.html'})
export class ReorderPage {
 
  workoutdata:any;

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public viewCtrl: ViewController
  ) 
  { 

    this.workoutdata = this.params.get('data');
  }
  
  reorderItems(indexes:any) {
    this.workoutdata = reorderArray(this.workoutdata, indexes);
  }

  dismiss(){
    this.viewCtrl.dismiss(this.workoutdata);   
  } 

  
}
