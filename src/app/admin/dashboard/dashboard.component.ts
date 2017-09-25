import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, HostBinding } from '@angular/core';
import {single} from '../../models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'col-xl-10'}
})
export class DashboardComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, {single})   
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
