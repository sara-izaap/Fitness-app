import { Component } from '@angular/core';
import {NavController,NavParams,ActionSheetController,ModalController } from 'ionic-angular';
import * as moment from 'moment'
import { GlobalVars } from '../../providers/globalVars';
import { UserService } from '../../providers/userService';
import {BodyfatcatPage} from './bodyfatcat/bodyfatcat';

@Component({ selector:'page-measurement',templateUrl:'measurement.html'})

export class MeasurementPage {
 
  user_id:any;
  segment:string = 'measurement';
  counter:any = Array;
  weight_units:string='kg';
  weightval:any = {kg_num:'88',kg_float:'5',st_num:'13',st_float:'13',lbs_num:'195',lbs_float:'0'};
  mea_bodyside:string='left';
  mea_units:string='mmcm';
  mea_mmcm:any ={'left':{neck:'45',chest:'86',arm:'53',waist:'21',hips:'34',thigh:'30.5',calf:'30.5'},'right':{neck:'45',chest:'78',arm:'45',waist:'98',hips:'45',thigh:'84',calf:'24'}};
  mea_inches:any ={'left':{neck:'17',neck_float:'11/16',chest:'33',chest_float:'7/8',arm:'20',arm_float:'7/8',waist:'8',waist_float:'1/4',hips:'13',hips_float:'3/8',thigh:'12',thigh_float:'0',calf:'12',calf_float:'0'},'right':{neck:'17',neck_float:'11/16',chest:'30',chest_float:'11/16',arm:'17',arm_float:'11/16',waist:'38',waist_float:'9/16',hips:'17',hips_float:'11/16',thigh:'33',thigh_float:'1/16',calf:'9',calf_float:'7/16'}};
  meaunit_inches:any =['0','1/16','1/8','3/16','1/4','5/16','3/8','7/16','1/2','9/16','5/8','11/16','3/4','13/16','7/8','15/16'];
  response:any;
  fat_bodyside:string = 'left';
  fat_units:string='mmcm';
  calculate:any = {left:'0',right:'0',total:''};
  fat_mmcm:any ={'left':{chest:'',tricep:'',bicep:'',subscapular:'',midaxillary:'',abdominal:'',suprailiac:'',thigh:''},'right':{chest:'',tricep:'',bicep:'',subscapular:'',midaxillary:'',abdominal:'',suprailiac:'',thigh:''}};
  fat_inches:any ={'left':{chest:'',chest_float:'0',tricep:'',tricep_float:'0',bicep:'',bicep_float:'0',subscapular:'',subscapular_float:'0',midaxillary:'',midaxillary_float:'0',abdominal:'',abdominal_float:'0',suprailiac:'',suprailiac_float:'0',thigh:'',thigh_float:'0'},'right':{chest:'',chest_float:'0',tricep:'',tricep_float:'0',bicep:'',bicep_float:'0',subscapular:'',subscapular_float:'0',midaxillary:'',midaxillary_float:'0',abdominal:'',abdominal_float:'0',suprailiac:'',suprailiac_float:'0',thigh:'',thigh_float:'0'}};
  bodyfatres:any;
  parmeas:any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl:ActionSheetController,
    public modalCtrl: ModalController,
    private globalVar:GlobalVars,
    public params:NavParams,
    public userservice:UserService
  ) 
  { 
    this.parmeas = this.params.data;
  }

  ngOnInit() {

    if(this.parmeas instanceof Object && Object.keys(this.parmeas).length ){
       this.segment = this.parmeas.type;
    }
    

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;
      this.getMeasurement();
      this.getBodyfatList();
    });

  }

  getMeasurement() {

    this.userservice.getMeasurements(this.user_id).then(res =>{
      this.response = res.data;

      if(this.response.length){

        let filldata:any = this.response[0];

        if(this.parmeas instanceof Object && this.parmeas.type=='measurement'){
           filldata =  this.response.find((x:any) => x.id == this.parmeas.id);
        }

        this.mea_mmcm = filldata['measurement']['mmcm'];
        this.mea_mmcm = filldata['measurement']['inches'];
        this.weight_units = filldata['weight_unit'];

        let weightavl:any = filldata['weight'].split(".");
        this.weightval[this.weight_units+'_num'] = weightavl[0];
        this.weightval[this.weight_units+'_float'] = weightavl[1];

      }
    })
    .catch(error => console.log(error));
  }

  saveMeasurement(){

      let postdata:any ={};
      postdata['measurement']  = {mmcm:this.mea_mmcm, inches:this.mea_inches};
      postdata['weight_unit'] = this.weight_units;
      postdata['weight'] = this.weightval[this.weight_units+'_num']+'.'+this.weightval[this.weight_units+'_float'];
      postdata['user_id'] = this.user_id;

      this.userservice.saveMeasure(postdata).then((res) =>{
        this.getMeasurement();
        console.log(res);
      });
  }

  calculatefat(){
    
    let count:any='0';
    let data:any = this.fat_mmcm[this.fat_bodyside];

    for(let res in data){

      if(Number(data[res]))
        count = parseFloat(count) + parseFloat(data[res]);
    }

    if(count > 0){

      count = count/8;
      count = parseFloat(count).toFixed(2);
      this.calculate[this.fat_bodyside] = count;

      let divider:number= 1;

      if(this.calculate['left'] != 0 && this.calculate['right'] !=0)
        divider = 2;

      let total:any = parseFloat(this.calculate['left']) + parseFloat(this.calculate['right']);

      let totval:any = (total/divider);

       this.calculate['total'] = parseFloat(totval).toFixed(2);
    }

  }

  getBodyfatList() {

    this.userservice.getBodyfatlists(this.user_id).then(res =>{
      this.bodyfatres = res.data;

      if(this.bodyfatres.length){

        let filldata:any = this.bodyfatres[0];

        if(this.parmeas instanceof Object && this.parmeas.type=='bodyfat'){
           filldata =  this.bodyfatres.find((x:any) => x.id == this.parmeas.id);
        }
        this.fat_mmcm = filldata['bodyfat']['mmcm'];
        this.fat_inches = filldata['bodyfat']['inches'];

        this.calculate['left']  = filldata['left_fat'];
        this.calculate['right'] = filldata['right_fat'];
        this.calculate['total'] = filldata['total_fat'];
      }
    })
    .catch(error => console.log(error));
  }

  savebodyFat(){

      let postdata:any ={};
      postdata['bodyfat']  = {mmcm:this.fat_mmcm, inches:this.fat_inches};
      postdata['percent'] = this.calculate;
      postdata['user_id'] = this.user_id;

      this.userservice.saveBodyfat(postdata).then((res) =>{
        this.getBodyfatList();
        console.log(res);
      });
  }

  DeleteMeasurement(date:any,unit_id:number,type:string) {

     let actionSheet = this.actionSheetCtrl.create({
       title: moment(date).format('DD MMM YYYY'),
       buttons: [
         {
           text: 'Delete',
           role: 'destructive',
           icon: 'trash',
           handler: () => {
              
              let postdata:any = {user_id:this.user_id,id:unit_id,type:type};

              this.userservice.deleteMeasurement(postdata).then((res) =>{

                if(type == 'measurement')
                   this.getMeasurement();
                else                   
                  this.getBodyfatList();

                console.log(res);
              });
           }
         },
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
     });

     actionSheet.present();
  }
   
  Viewbodyfatcat(){

    let bodyfatcat =  this.modalCtrl.create(BodyfatcatPage);

    bodyfatcat.present();

  } 
 
}
