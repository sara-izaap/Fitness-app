import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import { NutritionService } from '../../../providers/nutritionService';


@Component({ selector:'page-foodview',templateUrl:'editfood.html'})
export class EditfoodPage {
  
  foodobject:any;
  food:any;
  foodunits:any;
  seldata:any={};
  num_servings = 1;

  constructor(public viewCtrl: ViewController,public params:NavParams,public nuservice:NutritionService) {

    this.food = this.params.get('food');
    this.num_servings = this.food.serving_size;
  }

  ngOnInit() {

    this.nuservice.getFoodUnits(this.food.food_id).then(res =>{
      this.foodunits = res.data;
      if(this.foodunits)
        this.foodunitchange(this.food.food_unit_id);
    })
    .catch(error => console.log(error));

  }

  foodunitchange(food_unit_id:any){

    this.foodobject = food_unit_id;
     for(let row of this.foodunits) {

        if(food_unit_id == row['food_unit_id'])
          this.seldata = row;
     }    

  }

  EditfoodtoPlan(){
    this.seldata['food_name'] = this.food.food_name;
    this.seldata['serving_size'] = this.num_servings;

    let retdata:any = {type:true,data:this.seldata};
    this.viewCtrl.dismiss(retdata);
  }

  delete(){
    let retdata:any = {type:false,data:'delete'};
    this.viewCtrl.dismiss(retdata);   
  }

  dismiss(){
    this.viewCtrl.dismiss(false);   
  }

  
}
