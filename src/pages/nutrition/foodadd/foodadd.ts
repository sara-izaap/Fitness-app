import { Component } from '@angular/core';
import {NavParams,NavController, ViewController,LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NutritionService } from '../../../providers/nutritionService';

@Component({ selector:'page-foodadd',templateUrl:'foodadd.html'})
export class FoodaddPage {
  
  user_id:any;
  units:any;
  submitted:boolean = false;
  food:any = {};
  callback:any;

  constructor(public viewCtrl: ViewController,
  public params:NavParams,
  public nuservice:NutritionService,
  private loader:LoadingController,
  public navCtrl: NavController) {

    this.callback  = this.params.get('callback');
    this.user_id = this.params.get('user_id');

  }

  ngOnInit() {

    this.nuservice.getUnitmeasures().then(res =>{
      this.units = res.data;
      
    })
    .catch(error => console.log(error));

  }

  Addfood(form: NgForm){

    let loading = this.loader.create();
    this.submitted = true;

    if (form.valid) {

      this.food['user_id'] = this.user_id;
      loading.present(); 

       this.nuservice.SaveFood(this.food).then((res) => {

        loading.dismiss();

        this.callback(res.data).then(()=>{ this.navCtrl.pop() });

      }, (err) => {
        console.log(err);
      });

    }
  }
  
}
