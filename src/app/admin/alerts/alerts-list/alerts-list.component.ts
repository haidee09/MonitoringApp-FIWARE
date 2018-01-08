import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import * as L from 'leaflet';
import { Observable } from 'rxjs/Observable';
import { Alerts } from '../../../models/alerts';
@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.css'],
  host:{'class':'col-xl-10'}
})
export class AlertsListComponent implements OnInit {
  alertsDB : Alerts[] = [];
  alertsDBTemp : any[] = [];
  //SOCKETS
  alerts = [];
  connection: any;
  alertsNumber: number = 0 ;
  p: number;
  constructor(public alertService:AlertService) {
    this.p = 1;
  }
  alertsList(){
    //INICIO ALERTAS-- OBTENER TODAS LAS ALERTAS DE LA BD
     this.alertService.listAlerts().subscribe(
      (res) => {
        for(let i=res.length-1; i>=0; i--){
          //console.log(res[i])
          this.alertsDBTemp.push(res[i]);
        }
        //console.log(this.alertsDBTemp)
        this.alertsDB = this.alertsDBTemp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.alertsList();
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      //PETICION DE LAS ALERTAS NUEVAMENTE
      this.alertsDBTemp = [];
      this.alertsDB = [];
      this.alertsList();
    })    
  }
  deleteAlert(itemID:string){
    //PETICION DE LAS ALERTAS NUEVAMENTE
    this.alertsDBTemp = [];
    this.alertsDB = [];
    this.alertService.deleteAlert(itemID).subscribe(
      (res) =>{
        console.log(res);
        this.alertsList();
      },
      (error) =>{
        console.log(error);
      }
    )    
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
