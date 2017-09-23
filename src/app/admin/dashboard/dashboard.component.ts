import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, HostBinding } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'col-xl-10'}
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
