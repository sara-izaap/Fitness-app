import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class NutritionService {
    
    constructor(public http: Http) {   }

    getPlans(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/plans?id='+ id, options).map(res => res.json())
            .toPromise();
    }

    getTodayLog(id:number,date:any){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/userplandata?id='+id+'&date='+date, options).map(res => res.json()).toPromise();
    }

    getPlandata(plan_id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/indv_plandata?plan_id='+plan_id, options).map(res => res.json()).toPromise();
    }

    getFoodList(id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/foodlist?user_id='+id, options).map(res => res.json()).toPromise();
    }

    getFoodUnits(food_id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/foodunits?food_id='+food_id, options).map(res => res.json()).toPromise();
    }

    SaveNutritionLog(plandata:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'nutrition/savenutrition', plandata, options).map(res => res.json())
            .toPromise();

    }

    getUnitmeasures(){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'nutrition/unitmeasures', options).map(res => res.json()).toPromise();
    }

    SaveFood(food:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'nutrition/creatfood', food, options).map(res => res.json())
            .toPromise();
    }

}
