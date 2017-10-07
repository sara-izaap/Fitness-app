import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalVars {
  resdata:any;
  constructor(public storage: Storage) {}

  setUserdata(value:any) {
    this.storage.set('userData', value);
  }

  getUserdata() {
  	return this.storage.get('userData').then((data) => {     
      return data;
    });
  }

  getId() {
  	return this.storage.get('userData').then((value) => {
      var val = JSON.parse(value);
      return val.id;
    });
  }

}