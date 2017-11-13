import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import  io from 'socket.io-client';

@Injectable()
export class AlertService {
  private url = 'http://207.249.127.149:3001';  
  private socket;
  constructor(private toastr: ToastrService) { }
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io.connect(this.url, { transports: ['websocket'] });
      console.log('Connection '+this.url)
      this.socket.on('newAlert', (alert) => {
        this.toastr.info('id: '+alert['data'][0]['id'], 'New Alert');
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

}
