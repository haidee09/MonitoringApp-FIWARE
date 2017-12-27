import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Admin } from '../models/administrator';
import { Subject } from 'rxjs/Subject';

import { environment} from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AdminService {
  //URL MODIFICAR
  private service_url = environment.back_sdk;
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }
  createAdmin(admin: Admin): Observable<Admin[]> {
    let body = JSON.stringify(admin);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/administrator`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }
  readAdmin(idAdministrator: String): Observable<Admin[]>{
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/administrator/${idAdministrator}`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }

}
