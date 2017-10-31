import { Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

import { NutritionService } from '../../../providers/nutritionService';

@Component({ selector:'page-foodlist',templateUrl:'foodList.html'})
export class FoodlistPage {
 
  segment='recent';
  userdata:any;
  recent:any;
  frequent:any
  myfoods:any;
  
  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public nuservice:NutritionService
  ) 
  { 
    this.userdata = this.params.data;
    console.log(this.userdata);
  }
  
  ngOnInit(){

    this.getFoodlist();
  }

  getFoodlist(){
  
    this.nuservice.getFoodList(this.userdata.user_id).then(res =>{
        this.recent = res.frequent;
        this.frequent = res.frequent;
        this.myfood = res.myfood;
    })
    .catch(error => console.log(error));
  } 

  
}
