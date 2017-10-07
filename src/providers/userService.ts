import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class UserService {
    
    constructor(public http: Http) {   }

    get_notifications(id:number) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/notification?id='+id ,options)
            .map(res => res.json())
            .toPromise();

    }

    get_activities(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/activity?id='+id ,options)
            .map(res => res.json())
            .toPromise();

    }

    saveaccount(account:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/accountsave', account, options).map(res => res.json())
            .toPromise();
    }

    savenotification(formdata:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/notificationsave', formdata, options).map(res => res.json())
            .toPromise();

    }


}
