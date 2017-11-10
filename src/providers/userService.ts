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

    addChat(formdata:any){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/add_chat', formdata, options).map(res => res.json())
            .toPromise();

    }

    get_chats(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/get_chat?id='+id ,options)
            .map(res => res.json())
            .toPromise();

    }

    getFoodslist(user_id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/shoppingfood?user_id='+user_id ,options).map(res => res.json()).toPromise();
    }

    saveShoplist(data:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/saveshop_items', data, options).map(res => res.json())
            .toPromise();
    }

    getMeasurements(user_id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/measurementlist?user_id='+user_id ,options).map(res => res.json()).toPromise();
    
    }

    saveMeasure(data:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/save_mesaurement', data, options).map(res => res.json())
            .toPromise();
    }

    getBodyfatlists(user_id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/bodyfatlist?user_id='+user_id ,options).map(res => res.json()).toPromise();
    
    }

    saveBodyfat(data:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'user/save_bodyfat', data, options).map(res => res.json())
            .toPromise();
    }

    deleteMeasurement(data:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'user/deletemeasurement?user_id='+data.user_id+'&id='+data.id+'&type='+data.type, options).map(res => res.json())
            .toPromise();
    }

}
