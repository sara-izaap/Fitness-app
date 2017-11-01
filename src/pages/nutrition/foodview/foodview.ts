import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import { NutritionService } from '../../../providers/nutritionService';


@Component({ selector:'page-foodview',templateUrl:'foodview.html'})
export class FoodviewPage {
  
  foodobject:any;
  food:any;
  foodunits:any;
  seldata:any={};
  num_servings = 1;

  constructor(public viewCtrl: ViewController,public params:NavParams,public nuservice:NutritionService) {

    this.food = this.params.get('food');
  }

  ngOnInit() {

    this.nuservice.getFoodUnits(this.food.id).then(res =>{
      this.foodunits = res.data;
      if(this.foodunits)
        this.foodunitchange(this.foodunits[0]);
    })
    .catch(error => console.log(error));

  }

  foodunitchange(unit:any){

    this.foodobject = unit;
    this.seldata = unit;

  }

  AddfoodtoPlan(){
    this.seldata['food_name'] = this.food.food_name;
    this.seldata['serving_size'] = this.num_servings;

    this.viewCtrl.dismiss(this.seldata);
  }

  dismiss(){
    this.viewCtrl.dismiss(false);   
  }


  
}
