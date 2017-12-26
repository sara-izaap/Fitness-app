import { Component } from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({ 
  selector:'page-workoutnote',
  template:'<ion-header><ion-toolbar><ion-title>Notes {{title?" - "+title:""}}</ion-title><ion-buttons end><button (click)="dismiss()"><ion-icon name="md-close-circle" ion-icon-large> </ion-icon></button></ion-buttons></ion-toolbar></ion-header><ion-content><ion-card> <ion-card-content>{{note}}</ion-card-content></ion-card></ion-content>'})
export class WorkoutNote {
  
  note:any;
  title:string = "";

  constructor(public viewCtrl: ViewController,public params:NavParams) {

  	this.note = this.params.get('note');
  	this.title = this.params.get('title');
  }

  dismiss(){
    this.viewCtrl.dismiss();   
  }

  
}
