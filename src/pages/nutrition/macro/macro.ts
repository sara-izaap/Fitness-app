import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({ selector:'page-viewmacro',templateUrl:'macro.html'})
export class ViewmacroPage {
  
  plandata:any;
  macrodata:any={calories:'0',protein:'0',carbohydrate:'0',fibre:'0',sugars:'0',fat:'0',sodium:'0'};
  targetdata:any={calories:1000,protein:100,carbohydrate:270,fibre:50,sugars:60,fat:60,sodium:70};

  constructor(public viewCtrl: ViewController,public params:NavParams) {

    this.plandata = this.params.get('plandata');
    console.log(this.plandata );
  }

  ngOnInit() {

    for(let row in this.plandata){

      for(let item of this.plandata[row]){
        this.macrodata.calories = parseInt(this.macrodata.calories) + parseInt(item['serving_size'] * item['calories']);
        this.macrodata.protein = parseInt(this.macrodata.protein) + parseInt(item['serving_size'] * item['protien']);
        this.macrodata.carbohydrate = parseInt(this.macrodata.carbohydrate) + parseInt(item['serving_size'] * item['total_carbohydrates']);
        this.macrodata.fibre = parseInt(this.macrodata.fibre) + parseInt(item['serving_size'] * item['dietary_fiber']);
        this.macrodata.sugars = parseInt(this.macrodata.sugars) + parseInt(item['serving_size'] * item['sugars']);
        this.macrodata.fat = parseInt(this.macrodata.fat) + parseInt(item['serving_size'] * item['total_fat']);
        this.macrodata.sodium = parseInt(this.macrodata.sodium) + parseInt(item['serving_size'] * item['sodium']);
      }
    }

  }


  dismiss(){
    this.viewCtrl.dismiss();   
  }

  
}
