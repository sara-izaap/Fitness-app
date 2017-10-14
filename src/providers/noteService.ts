import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class NoteService {
    
    constructor(public http: Http) {   }

    getNotes(id:number){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'notes/notes?id='+ id, options).map(res => res.json())
            .toPromise();
    }

    SaveNote(formdata:any) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'notes/savenote', formdata, options).map(res => res.json())
            .toPromise();

    }


}
