import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable()
export class SocketAlertsService {

  alerts = [];
  connection;
  message;
  public alertService:AlertService;
  
  socketConnection(){
  return this.connection = this.alertService.getMessages().subscribe(newAlert => {
    if(this.alerts.length<10){
      this.alerts.push(newAlert);
    }
    else{
      this.alerts = [];
    }
    console.log(JSON.parse("["+newAlert['location']+"]"));
    //this.toastr.info('id: '+ allalerts['id'], 'New Alert');
  })
}

}
