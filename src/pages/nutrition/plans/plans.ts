import { Component,Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import {NavController, ModalController, AlertController,FabContainer,NavParams } from 'ionic-angular';
import * as moment from 'moment'
import { GlobalVars } from '../../../providers/globalVars';
import { NutritionService } from '../../../providers/nutritionService';
import{ CalendarModalPage } from '../calendarModal';
import { FoodlistPage } from '../food/foodList';
import {EditfoodPage} from '../foodedit/editfood';
import {ViewmacroPage} from '../macro/macro';

@Directive({
  selector: '[ngInit]',
})
export class NgInitDirective {
  @Input()
  set ngInit(context: any) {
    this.context.$implicit = this.context.ngInit = context;
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }

  context: { $implicit?: any, ngInit?: any } = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}
}

@Component({ selector:'page-plans',templateUrl:'plans.html'})
export class PlansPage {
 
  user_id:any;
  defaultplans:any;
  date:any = new Date();
  planData:any=[];
  mealPlans:any=[];
  segment:string = "plan";
  value:any="";
  nutritionplans:any="";
  getData:any;
  
  constructor(
    public navCtrl: NavController,
    private globalVar:GlobalVars,
    public nuservice:NutritionService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public params:NavParams
  ) 
  { 
    this.date = this.params.data;
    console.log(this.date);
  }

  ngOnInit() {

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.DefaultplanList(); 
      this.checkdata(this.date);     

    });

  }

  DefaultplanList(){

      this.nuservice.getPlans(this.user_id).then(res =>{
            this.defaultplans = res.data;
      })
      .catch(error => console.log(error));

  }

  openCalendar(){

    let myCalendar =  this.modalCtrl.create(CalendarModalPage, { date: this.date  });

    myCalendar.present();

    myCalendar.onDidDismiss(data => {

      if(moment(this.date).format('YYYY-MM-DD') != moment(data).format('YYYY-MM-DD')){
        this.date = new Date(data);
        this.checkdata(this.date);
      }          
      console.log(data);
    })

  }

  checkdata(date:any){

    date = moment(date).format('YYYY-MM-DD');
    
    this.nuservice.getTodayLog(this.user_id,date).then(res =>{
      if(res.avail == 1){
        this.planData = res.data;
        this.mealPlans = res.meal;
        this.segment="data";
      }
      else{
        this.segment="plan";
        this.value="";
      }
          
    })
    .catch(error => console.log(error));
    
  }

  planoverwrite(plan:any){

    const alert = this.alertCtrl.create({
      title: 'Change Nutrition Plan',
      message: 'If you have already started logging nutrition for today,these will be overwritten. Are you sure you want to load a different nutrition plan?',
      buttons: [
        {
          text: 'No',role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.nutritionLogplan(plan);
          }
        }
      ]
    });
    alert.present();
  }

  nutritionLogplan(plan:any){

    this.segment="data";

    if(plan != 'ownplan'){
      this.nutritionplans=plan;
      this.nuservice.getPlandata(plan).then(res =>{
          this.planData = res.data;
          this.mealPlans = res.meal;  
      })
      .catch(error => console.log(error));    
    }  
  }

  calculate(meal:any){

    let counter:any = '0';
    for(let row of this.planData[meal]) {
       counter = parseInt(counter) + parseInt(row['serving_size'] * row['calories']);
    }
    return counter;

  }

  Addmeal(fab:FabContainer ){

    fab.close();  
    const alert = this.alertCtrl.create({
      title: 'Add Meal',
      message:'Please enter a name for the meal',
      inputs: [
        {
          name: 'meal_name',
          placeholder: 'Meal Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.meal_name) {

              this.mealPlans.push(data.meal_name);
              this.planData[data.meal_name] = [];
              console.log(this.mealPlans);

            } else {
              return false;
            }
          }
        }
      ]
    });

    alert.present();

  }

  AddFood(meal:any){

    this.getData = (data:any) =>
    {
      return new Promise((resolve) => {
          this.planData[meal].push(data);
          console.log(data);
        resolve();
      });
    };

    let data = {meal:meal,user_id:this.user_id};

    this.navCtrl.push(FoodlistPage,{
      data:data,
      callback: this.getData
    });

  }

  EditFood(fooditem:any,pos:any){

    let foodEdit =  this.modalCtrl.create(EditfoodPage, { food: fooditem  });

    foodEdit.present();

    foodEdit.onDidDismiss(retdata => {

      if(retdata){
        
          if(retdata.type){            
              this.planData[fooditem.meal_name][pos] = retdata.data;
          }
          else
          {
            const index:number = this.planData[fooditem.meal_name].indexOf(pos);
            if (index === -1) 
                this.planData[fooditem.meal_name].splice(index, 1);
            
          }
      }
    })
  }

  ViewMacro(){

    let viewMacro =  this.modalCtrl.create(ViewmacroPage, { plandata: this.planData  });

    viewMacro.present();

  }

  SaveNutritionLog(){

      let savedata:any = {meal:this.planData,plandata:this.planData,user_id:this.user_id,date:moment(this.date).format('YYYY-MM-DD')};

      this.nuservice.SaveNutritionLog(savedata).then(res =>{
          console.log(res);
      })
      .catch(error => console.log(error));
  }

}
