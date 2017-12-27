import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs/Observable';
import { Alerts } from '../../models/alerts';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  
  //alertsDB : Alerts[];
  //SOCKETS
  alerts: any[] = [];
  alertsCounter: any;
  alertsNumber: number = 0;
  
  constructor( public alertService:AlertService){
  }
  /*constructor(alertService:AlertService,alertsDB :Alerts[],alerts,connection: any, alertsNumber: number=0) 
  { 
    this.alertService = alertService;
    this.alertsDB = alertsDB;
    this.alerts = alerts;
    this.connection = connection;
    this.alertsNumber = alertsNumber;
  }*/
  ngOnInit() {
    this.alertsCounter = this.alertService.getAlertsCounter().subscribe(newAlert => {
      this.alerts.push(newAlert);
      this.alertsNumber = this.alerts.length;
    })
  }
  resetAlertsCounter(){
    this.alerts = [];
    this.alertsNumber = 0;
    return;
  }
  ngOnDestroy(){
    this.alertsCounter.unsubscribe();
  }
}
