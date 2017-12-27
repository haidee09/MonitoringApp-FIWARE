import {  Directive, Component, EventEmitter, OnInit,  OnChanges,  OnDestroy,  Input,  Output} from '@angular/core';
import { ChangeDetectorRef, HostBinding } from '@angular/core';
import { Campus } from '../../models/campus';
import { CampusService } from '../../services/campus.service';
import { Zone } from '../../models/zone';
import { ZoneService } from '../../services/zone.service';

import { AlertService } from '../../services/alert.service';
import { SocketAlertsService } from '../../services/socket-alerts.service';
//import { ViewContainerRef } from '@angular/core';
//import { PushNotificationComponent } from '../../../../node_modules/ng2-notifications/ng2-notifications';
//import { AlertService } from '../../services/alert.service';
//import { ToastrService } from 'ngx-toastr';
import { single } from '../../models/data';
//import d3 from '.../../../node_modules/@types/d3/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'col-xl-10'}
})
//@Directive({ selector: typeof PushNotificationComponent })
export class DashboardComponent implements OnInit, OnDestroy{

  campusQuery: string = null;
  selectedZone: string = null;
  listZones: Zone[];
  listZonesCampusSelected: Zone[] = [];
  listCampus: Campus[];

  single: any[];
  multi: any[];
  view: any[] = [800,350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Alert';
  showYAxisLabel = true;
  yAxisLabel = 'Counting';
    // line, area
    autoScale = true;
    
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  colorScheme = {
    domain: [ '#55ACD2', '#B7332F', '#9166B8', '#92E7E8']
    //domain: [ '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc']
  };
  colorSchemePie = {
    domain: [ '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8']
  };

  alerts = [];
  connection: any;
  message: any;

  constructor(private campusService: CampusService, private zoneService:ZoneService, private socketAlerts: SocketAlertsService, private alertService:AlertService) {
    Object.assign(this, {single}) 
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )  
    //this.toastr.success('You are awesome!', 'Success!');   
    //this.toastr.setRootViewContainerRef(vcr);
    
  }
  ngOnInit(){
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }
  onSelect(event) {
    console.log(event);
  }
  onChangeValueCampus(newValue: string){
    console.log("Valor de la variable this.selectedCampus "+this.campusQuery)
    this.listZonesCampusSelected = [];
    return this.zoneService.listZones().subscribe(
      (res) => {
        this.listZones = res;
        console.log(this.listZones);
        this.analizeZones(this.listZones);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  analizeZones(zones: Zone[]){
    console.log(zones);
    console.log("Valor de la variable this.selectedCampus en el método analizeZones() "+this.campusQuery);
    for(let i=0; i<zones.length;i++){
      if(zones[i]['refCampus'] === this.campusQuery){
        console.log(zones[i]['refCampus']);
        this.listZonesCampusSelected.push(zones[i]);
      }
    }
    if(this.listZonesCampusSelected===null){
      this.message = "Not exist zones registered of this campus yet";
      console.log("No existen zonas registradas de este campus");
    }
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
