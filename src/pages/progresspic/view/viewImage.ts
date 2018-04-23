import { Component,ViewChild } from '@angular/core';
import {NavController,NavParams,ViewController,Slides} from 'ionic-angular';

@Component({ selector:'progress-viewimage',templateUrl:'viewimage.html'})
export class ViewprogressPhoto {
  
  @ViewChild('slides') slides: Slides;
  imgdata:any;

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public viewCtrl: ViewController
  ) 
  { 
    this.imgdata = this.params.get('data');
    console.log(this.imgdata);
  }

  dismiss(){
    this.viewCtrl.dismiss();   
  } 

  
}
