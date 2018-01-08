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
export class AuthService {

  private service_url = environment.back_sdklocal;
  private token: string;
  private adminSource = new Subject<Admin>();
  admin$ = this.adminSource.asObservable();


  constructor(public http: Http) { }
  
  setAdmin(user: Admin) {
    this.adminSource.next(user);
  }

  loginUser(admin): Observable<Object> {
    let body = JSON.stringify(admin);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.service_url}/authenticateAdmin`, body, options)
    .map((res) => this.setToken(res));
  }

  setToken(res){
    let body = JSON.parse(res['_body']);
    if(body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({
        adminData: body['admin'],
        token: this.token
      }));
    }
    console.log(body);
    return body;
  }

}
