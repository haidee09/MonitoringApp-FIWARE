import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  //URL MODIFICAR
  private service_url = 'http://localhost:4000/api';
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  createUser(user: UserService): Observable<User[]> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/administrator`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
