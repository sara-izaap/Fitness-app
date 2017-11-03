import { Component } from '@angular/core';
import {NavController,NavParams,ModalController} from 'ionic-angular';
import { NutritionService } from '../../../providers/nutritionService';
import {ViewmacroPage} from '../macro/macro';

@Component({ selector:'page-viewplandata',templateUrl:'lognutplan.html'})

export class LognutplanPage {
 
  plan:any;
  planData:any=[];
  mealPlans:any=[];

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public modalCtrl: ModalController,
    public nuservice:NutritionService
  ) 
  { 
    this.plan = this.params.data;
  }

  ngOnInit() {

    this.nuservice.getPlandata(this.plan.id).then(res =>{
        this.planData = res.data;
        this.mealPlans = res.meal;  
    })
    .catch(error => console.log(error)); 

  }

  calculate(meal:any){

    let counter:any = '0';
    for(let row of this.planData[meal]) {
       counter = parseInt(counter) + parseInt(row['serving_size']) * parseInt(row['calories']);
    }
    return counter;

  }

   ViewMacro(){

    let viewMacro =  this.modalCtrl.create(ViewmacroPage, { plandata: this.planData  });

    viewMacro.present();

  }

  
}
