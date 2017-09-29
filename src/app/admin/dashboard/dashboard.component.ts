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

  constructor() {
    Object.assign(this, {single})   
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
