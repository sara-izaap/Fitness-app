import { Component,ViewChild } from '@angular/core';
import {NavController,NavParams,ViewController,Select} from 'ionic-angular';
import { WorkoutService } from '../../../providers/workoutService';

@Component({ selector:'page-addexercise',templateUrl:'addexercise.html'})
export class AdddExercisePage {
 
 @ViewChild('mySelect') mySelect: Select;

  segment='search';  
  recent:any;
  frequent:any
  bodypart:any;
  searchres:any=[];
  bodycat:any="";
  searchKey:string = "";
  bodypartList:any;
  cardioItems:any =[];
  showSelect:boolean=true;

  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public viewCtrl: ViewController,
    public workservice:WorkoutService
  ) 
  {  }
  
  ngOnInit(){

    this.getExerciselist();
  }

  getExerciselist(){
  
    this.workservice.getExerciseList().then(res =>{
        this.recent = res.data;
        this.frequent = res.data;
        this.bodypartList = res.bodypart;
        console.log(this.bodypartList);
    })
    .catch(error => console.log(error));
  }

  onInput() {

    if(this.searchKey)
      this.findByName('search',this.searchKey);
    else
      this.searchres = [];
  }

  findByName(type:string,filter:any){

    console.log(type+'--'+filter);

    this.workservice.getFilterExercises(filter,type).then(res =>{

        if(type == 'search')
          this.searchres = res.data;

        if(type == 'bodycat')
          this.bodypart = res.data;
    })
    .catch(error => console.log(error));
  }

  Cardioexercise(exercise:number){

    this.workservice.getCardioExercises(exercise).then(res =>{

      if(!res.data)
        return false;

      this.cardioItems = res.data;

      setTimeout(() => { this.mySelect.open(); },500);

    })
    .catch(error => console.log(error));

  }

  Addexercise(exercise:number){

    this.workservice.exercisedefaultData(exercise).then(res =>{
      
      this.viewCtrl.dismiss(res.data);

    })
    .catch(error => console.log(error));
  }

  dismiss(){
    this.viewCtrl.dismiss(false);   
  } 

  
}
