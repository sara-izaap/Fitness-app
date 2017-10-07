import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class AuthService {

  constructor(public http : Http) {  }

  postData(credentials:any) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let options = new RequestOptions({ headers: headers });

      this.http.post(apiUrl + 'user/login', credentials, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }
  

}