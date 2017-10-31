import { Component } from '@angular/core';

import {NavController, LoadingController,ToastController,Refresher,FabContainer} from 'ionic-angular';

import { GlobalVars } from '../../providers/globalVars';
import { NutritionService } from '../../providers/nutritionService';
import { PlansPage } from './plans/plans';


@Component({ selector:'page-nutrition',templateUrl:'nutrition.html'})

export class NutritionPage {
 
  user_id:any;
  defaultplans:any;
  loading:any;

  constructor(
    public navCtrl: NavController,
    private globalVar:GlobalVars,
    public nuservice:NutritionService,
    private loader:LoadingController,
    public toastCtrl: ToastController
  ) 
  {  }

  ngOnInit() {

    this.loading = this.loader.create();

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.DefaultplanList();

    });

  }

  DefaultplanList(){

      this.nuservice.getPlans(this.user_id).then(res =>{
            this.defaultplans = res.data;
      })
      .catch(error => console.log(error));

  }

  Addplan(fab:FabContainer){
    fab.close();
    let date = new Date();
    this.navCtrl.push(PlansPage,date);
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
