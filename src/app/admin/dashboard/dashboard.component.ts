import {  Directive, Component, EventEmitter, OnInit,  OnChanges,  OnDestroy,  Input,  Output} from '@angular/core';
import { ChangeDetectorRef, HostBinding } from '@angular/core';
//import { ViewContainerRef } from '@angular/core';
//import { PushNotificationComponent } from '../../../../node_modules/ng2-notifications/ng2-notifications';
import { AlertService } from '../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { single } from '../../models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'col-xl-10'}
})
//@Directive({ selector: typeof PushNotificationComponent })
export class DashboardComponent implements OnInit, OnDestroy{

  single: any[];
  multi: any[];
  view: any[] = [500,500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Alert';
  showYAxisLabel = true;
  yAxisLabel = 'Counting';
  
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  colorScheme = {
    domain: ['#aed581', '#ce93d8', '#ffcc80']
  };
  colorSchemePie = {
    domain: ['#aed581', '#ce93d8', '#ffcc80', '#AAAAAA']
  };

  alerts = [];
  connection;
  message;

  constructor(private toastr: ToastrService, private alertService:AlertService) {
    Object.assign(this, {single})   
    //this.toastr.success('You are awesome!', 'Success!');   
    //this.toastr.setRootViewContainerRef(vcr);
    
  }  
  onSelect(event) {
    console.log(event);
  }
  showSuccess(){
    this.toastr.success('You are awesome!', 'Success!');
  }
  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      this.alerts.push(newAlert);
      this.myShowFunction();
      //this.toastr.info('id: '+newAlert['data'][0]['id'], 'New Alert');
    })
  }  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  myShowFunction(){
    
  }
  myCloseFunction(){

  }
}
