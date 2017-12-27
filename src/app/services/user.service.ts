import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
import { CommonData } from '../models/commondata';
import { environment} from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  //URL MODIFICAR
  private service_url = environment.back_sdk;
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  createUser(user: CommonData): Observable<CommonData[]> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/user`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }
  listUsers(): Observable<User[]>{    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/user`, options) // ...using post request
    .map((res) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }
  checkContextUser(jsonQuery): Observable<any>{
    let body = jsonQuery;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/query`, body, options) // ...using post request
    .map((res) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  deleteUser(idUser: string): Observable<User>{
    return this.http.delete(`${this.service_url}/user/${idUser}`) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
