import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Company } from '../models/company';
import { Subject } from 'rxjs/Subject';
import { environment} from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CompanyService {
  //URL MODIFICAR
  private service_url = environment.back_sdk;
  //private userSource = new Subject<User>();
  //user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  createCompany(company: Company): Observable<Company[]> {
    let body = JSON.stringify(company);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.post(`${this.service_url}/company`, body, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }

  readCompany(idCompany: String): Observable<Company[]> {
    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/company/${idCompany}`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
  }

}
