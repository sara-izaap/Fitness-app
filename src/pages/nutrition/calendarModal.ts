import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar'

@Component({ selector:'page-calendar',templateUrl:'calmodal.html'})

export class CalendarModalPage {
 
  date:any;
  optionsBasic: CalendarComponentOptions = { pickMode:'single',
      canBackwardsSelected: true,
      color: 'cal-color',
      doneIcon: false,
      closeIcon: false,
      autoDone: true,
      showMonthPicker:true,
      defaultDate: new Date()
    };

  constructor(public viewCtrl: ViewController,public params:NavParams) {

    this.date = params.get('date');
    this.optionsBasic.defaultDate = this.date;
  }

  onChange($event){
    console.log($event);
    this.viewCtrl.dismiss($event);   
  }

  
}
