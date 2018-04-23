import { Component } from '@angular/core';
import {NavController,LoadingController,Refresher,ToastController,ModalController} from 'ionic-angular';
import * as moment from 'moment'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GlobalVars } from '../../providers/globalVars';
import { UserService } from '../../providers/userService';
import {ViewprogressPhoto} from "./view/viewImage";

@Component({ selector:'page-progresspic',templateUrl:'progresspic.html'})

export class ProgressPicPage {
 
  user_id:any;
  responsedata:Array<any>;
  photourl:string;
  paramdata:any = {user_id:'',photo:''};
  
  constructor(
    public navCtrl: NavController,
    private loader:LoadingController,
    private camera: Camera,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private globalVar:GlobalVars,
    public userservice:UserService
  ) 
  {  }

  ngOnInit() {

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.getProgresspic();
    });

  }


  getProgresspic(){

    this.userservice.getProgressPhotos(this.user_id).then(res =>{
        this.responsedata = res.data;
        this.photourl = res.photourl;
    })
    .catch(error => console.log(error));
  }

  uploadPhoto(){

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
      
    }

    let loading = this.loader.create(); 

    this.camera.getPicture(options).then((imageData) => {

        if(typeof imageData !== "string")
          return false;

        loading.present();

        let encodeimg:string = 'data:image/jpeg;base64,' + imageData;

        this.paramdata.user_id = this.user_id;
        this.paramdata.photo = encodeimg;

        this.userservice.photoUpload(this.paramdata).then(res =>{

           loading.dismiss();
           this.getProgresspic();
           console.log(res);
        })
        .catch(error => console.log(error));

        console.log(encodeimg);

    },(err) => {
        console.log(err);
    });
  }

  takePhoto(){

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
      
    }

    let loading = this.loader.create();
    

    this.camera.getPicture(options).then((imageData) => {

        let encodeimg:string = 'data:image/jpeg;base64,' + imageData;

        if(typeof imageData !== "string")
          return false;

        loading.present(); 

        this.paramdata.user_id = this.user_id;
        this.paramdata.photo = encodeimg;

        this.userservice.photoUpload(this.paramdata).then(res =>{

           loading.dismiss();
           this.getProgresspic();
           console.log(res);
        })
        .catch(error => console.log(error));

    },(err) => {
        console.log(err);
    });
  }

  Openimage(item:any){

    item['photourl'] = this.photourl;

    item['created_date'] = moment(item['created_date']).local().format('YYYY-MM-DD');

    let viewImage =  this.modalCtrl.create(ViewprogressPhoto,{data:item});

    viewImage.present();

  } 

  doRefresh(refresher: Refresher) {

     this.userservice.getProgressPhotos(this.user_id).then(res =>{
       
        this.responsedata = res.data;

        setTimeout(() => {
            refresher.complete();

            const toast = this.toastCtrl.create({
              message: 'Progress photos have been updated.',
              duration: 3000
            });
            toast.present();
        }, 1000);
    })
    .catch(error => console.log(error));
   
  }

  
}
