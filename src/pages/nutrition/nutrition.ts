import { Component } from '@angular/core';

import {NavController, LoadingController,ToastController,Refresher,FabContainer} from 'ionic-angular';

import { GlobalVars } from '../../providers/globalVars';
import { NutritionService } from '../../providers/nutritionService';
import { PlansPage } from './plans/plans';
import { LognutplanPage } from './lognutplan/lognutplan';

@Component({ selector:'page-nutrition',templateUrl:'nutrition.html'})

export class NutritionPage {
 
  user_id:any;
  defaultplans:any;
  responsedata:Array<any>;
  loading:any;
  searchKey:string = "";

  constructor(
    public navCtrl: NavController,
    private globalVar:GlobalVars,
    public nuservice:NutritionService,
    private loader:LoadingController,
    public toastCtrl: ToastController
  ) 
  {  }

  ngOnInit() {

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.DefaultplanList();

    });

  }

  DefaultplanList(){

    this.loading = this.loader.create();
    this.loading.present();

      this.nuservice.getPlans(this.user_id).then(res =>{
          this.defaultplans = res.data;
          this.responsedata = res.data;
          this.loading.dismiss();

      })
      .catch(error => console.log(error));

  }

  onInput() {

    if(this.searchKey)
        this.defaultplans = this.findByName(this.searchKey); 
    else   
        this.defaultplans = this.responsedata; 

  }

  findByName(key:string) {
     return this.responsedata.filter((item) => {
        return item.name.toLowerCase().indexOf(key.toLowerCase()) > -1;           
    }); 
  }

  Addplan(fab:FabContainer){
    fab.close();
    let date = new Date();
    this.navCtrl.push(PlansPage,date);
  }

  Viewplan(plan:any){
    this.navCtrl.push(LognutplanPage,plan);
  }

  doRefresh(refresher: Refresher) {

        this.nuservice.getPlans(this.user_id).then(res =>{
            this.defaultplans = res.data;

            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                  message: 'Plans have been updated.',
                  duration: 3000
                });
                toast.present();
            }, 1000);
        })
        .catch(error => console.log(error));
   
    }
  
}
