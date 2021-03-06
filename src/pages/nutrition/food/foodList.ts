import { Component} from '@angular/core';
import {NavController,NavParams,ModalController,FabContainer} from 'ionic-angular';
import { NutritionService } from '../../../providers/nutritionService';
import {FoodaddPage} from '../foodadd/foodadd';
import {FoodviewPage} from '../foodview/foodview';

@Component({ selector:'page-foodlist',templateUrl:'foodList.html'})
export class FoodlistPage {
 
  segment='recent';
  userdata:any={};
  recent:any;
  frequent:any
  myfood:any;
  callback:any;
  getData:any;
  
  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public modalCtrl: ModalController,
    public nuservice:NutritionService
  ) 
  { 
    this.callback  = this.params.get('callback');
    this.userdata = this.params.get('data');
    
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

  viewFood(fooditem:any){

    let foodView =  this.modalCtrl.create(FoodviewPage, { food: fooditem  });

    foodView.present();

    foodView.onDidDismiss(data => {

      if(data){
        data['meal_name'] =  this.userdata.meal;
        this.callback(data).then(()=>{ this.navCtrl.pop() });
      }
    })

  }

  createFood(fab:FabContainer ){
    fab.close();  
    this.getData = (data:any) =>
    {
      return new Promise((resolve) => {
          this.viewFood(data);
          this.getFoodlist();
        resolve();
      });
    };

    this.navCtrl.push(FoodaddPage,{
      user_id:this.userdata.user_id,
      callback: this.getData
    });

  } 

  
}
