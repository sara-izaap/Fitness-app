import { Component } from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { WorkoutService } from '../../../providers/workoutService';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({ selector:'page-exerciseinfo',templateUrl:'exerciseinfo.html'})
export class Exerciseinfo {
  
  trustedVideoUrl: SafeResourceUrl;
  exercise:any;
  response:any={};
  activated:boolean=false;

  constructor(public viewCtrl: ViewController,public params:NavParams,public workservice:WorkoutService,private domSanitizer: DomSanitizer) {

  	this.exercise = this.params.get('exercise');
  }

  ngOnInit(){
     this.workservice.getExerciseInfo(this.exercise.id).then(res =>{
        this.response = res.data;

        if(this.response && this.response.file!='' && this.response.file_type=='video')
        	this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.response.file);

        this.activated = true;
    })
    .catch(error => console.log(error));
  }

  dismiss(){
    this.viewCtrl.dismiss();   
  }

  
}
