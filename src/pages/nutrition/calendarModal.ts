import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar'

@Component({ selector:'page-calendar',templateUrl:'calmodal.html'})

export class CalendarModalPage {
 
  date:any;
  optionsBasic: CalendarComponentOptions = { };

  constructor(public viewCtrl: ViewController,public params:NavParams) {

    this.date = params.get('date');
  }

  ondateChange($event:any){
    console.log($event);
    this.viewCtrl.dismiss($event);   
  }

  
}
