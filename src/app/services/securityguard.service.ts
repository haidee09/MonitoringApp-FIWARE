import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { CommonData } from '../models/commondata';
import { SecurityGuard } from '../models/securityguard';
import { environment} from '../../environments/environment';

@Injectable()
export class SecurityguardService {

  //URL MODIFICAR
  private service_url = environment.back_sdk;
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  createSecurityGuard(sg: CommonData): Observable<CommonData[]> {
    let body = JSON.stringify(sg);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/securityGuard`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  listSG(): Observable<SecurityGuard[]>{    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/securityGuard`, options) // ...using post request
    .map((res) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
