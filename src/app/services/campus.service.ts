import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Campus } from '../models/campus';
import { Subject } from 'rxjs/Subject';
import { environment} from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CampusService {

  //URL MODIFICAR
  private service_url = environment.back_sdk;
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  createCampus(campus: Campus): Observable<Campus[]> {
    let body = JSON.stringify(campus);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/campus`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error')); //...errors if any
  }
  
  readCampus(idCampus: String): Observable<Campus> {    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/campus/${idCampus}`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error')); //...errors if any
  }

  listCampus(): Observable<Campus[]> {
    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/campus`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error')); //...errors if any
  }

  queryContextDevices(idCampus: String): Observable<Object[]> {
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/devicesCampus/${idCampus}`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error')); //...errors if any
  }
  queryContextAlerts(idCampus: String): Observable<Object[]> {
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/alertsCampus/${idCampus}`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error')); //...errors if any
  }

}
