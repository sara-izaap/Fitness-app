import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({ selector:'page-bodyfatcategories',templateUrl:'bodyfatcat.html'})
export class BodyfatcatPage {
  
  constructor(public viewCtrl: ViewController) {

  }

  dismiss(){
    this.viewCtrl.dismiss();   
  }

  
}
