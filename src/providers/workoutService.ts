import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class WorkoutService {
    
    constructor(public http: Http) {   }

    getworkoutList(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/workoutlist?user_id='+ id, options).map(res => res.json())
            .toPromise();
    }

    getWorkoutData(id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/workoutdata?id='+ id, options).map(res => res.json())
            .toPromise();
    }

    getExerciseInfo(id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/exerciseinfo?id='+ id, options).map(res => res.json())
            .toPromise();
    }
    getExerciseList(){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/exerciselist', options).map(res => res.json())
            .toPromise();
    }

    getFilterExercises(filter:any,type:string){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/filterexercise?filter='+filter+'&type='+type, options).map(res => res.json())
            .toPromise();
    }

    exercisedefaultData(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/addexercisedata?id='+id, options).map(res => res.json())
            .toPromise();
    }

    getCardioExercises(id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/cardioexercise?id='+id, options).map(res => res.json())
            .toPromise();
    }

    SaveWorkout(postdata:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'workout/saveworkout', postdata, options).map(res => res.json())
            .toPromise();
    }

    getworkoutByUser(user:number,exercise:number,temp_id:number){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'workout/workoutbyuser?user_id='+user+'&exercise_id='+exercise+'&temp_id='+temp_id, options).map(res => res.json())
            .toPromise();
    }

}
