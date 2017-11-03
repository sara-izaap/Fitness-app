import { Component } from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular';
import { GlobalVars } from '../../providers/globalVars';
import { UserService } from '../../providers/userService';

@Component({ selector:'page-shoppinglist',templateUrl:'shoppingList.html'})

export class ShoppingListPage {
 
  user_id:any;
  responsedata:Array<any>;
  loading:any;
  
  constructor(
    public navCtrl: NavController,
    private loader:LoadingController,
    private globalVar:GlobalVars,
    public userservice:UserService
  ) 
  {  }

  ngOnInit() {

    this.globalVar.getUserdata().then((data) => {
      data = JSON.parse(data);
      this.user_id = data.id;

      this.shoppinglist();
    });

  }

  shoppinglist(){

    this.loading = this.loader.create();
    this.loading.present();

      this.userservice.getFoodslist(this.user_id).then(res =>{
          this.responsedata = res.data;
          this.loading.dismiss();

      })
      .catch(error => console.log(error));

  }

  ionViewWillLeave() {

    let shopdata:any = {user_id:this.user_id,data:this.responsedata};
    this.userservice.saveShoplist(shopdata).then(res =>{
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  
}
