import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Alerts } from '../models/alerts';
import { environment} from '../../environments/environment';
import  io from 'socket.io-client';
import { ObjectUnsubscribedError } from 'rxjs/util/ObjectUnsubscribedError';

@Injectable()
export class AlertService {

  private url = 'http://207.249.127.218:4000';  
  private service_url = environment.back_sdk;
  private socket;
  public alerts = [];
  //alertsObservable: Observable<Number>;

  constructor(public http: Http, private toastr: ToastrService) { }

  getMessages() {
    let observable = new Observable(observer => {
      //this.socket = io.connect(this.url, { transports: ['websocket'] });
      this.socket = io.connect(this.url);
      console.log('Connection '+this.url)
      this.socket.on('allalerts', (alert) => {
        //this.alerts.push(alert);
        if(alert['severity']==='informational'){
          this.toastr.info('subCategory: '+alert['subCategory'], 'Alert'+' category: '+alert['category']);
        }
        else if(alert['severity']==='critical' || alert['severity']==='high'){
          this.toastr.error('subCategory: '+alert['subCategory'], 'Alert'+' category: '+alert['category']);
        }
        else if(alert['severity']==='medium' || alert['severity']==='low'){
          this.toastr.warning('subCategory: '+alert['subCategory'], 'Alert'+' category: '+alert['category'])
        }
        console.log(alert);
        console.log(JSON.stringify(alert))
        observer.next(alert);    
      })
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
  getAlertsCounter(){
    let observable = new Observable(observer => {
      //this.socket = io.connect(this.url, { transports: ['websocket'] });
      this.socket = io.connect(this.url);
      console.log('Connection '+this.url)
      this.socket.on('allalerts', (alert) => {
        console.log(JSON.stringify(alert))
        observer.next(alert);    
      })
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
  /*getAlertsArray(){
    this.alertsObservable = new Observable( observer =>{
      observer.next(this.alerts.length);
    })
    return this.alertsObservable;
  }*/
  listAlerts(): Observable<Alerts[]> {
    
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.get(`${this.service_url}/alerts`, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }  

  deleteAlert(idAlert: string): Observable<Alerts>{

    //let headers = new Headers({ 'Accept': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    //URL MODIFICAR
    return this.http.delete(`${this.service_url}/alerts/${idAlert}`) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }
}
