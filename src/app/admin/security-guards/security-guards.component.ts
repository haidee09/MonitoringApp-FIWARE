import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-guards',
  templateUrl: './security-guards.component.html',
  styleUrls: ['./security-guards.component.css'],
  host:{'class':'col-xl-10'}
})
export class SecurityGuardsComponent{
  guardname:any;
  zonename:any;
  campusname:any;
  checkinhour:any;
  checkinminute:any;
  departurehour:any;
  departureminute:any;
  clearInputs(){
    this.guardname = "";
    this.zonename = "";
    this.campusname = "";
    this.checkinhour = "";
    this.checkinminute = "";
    this.departurehour = "";
    this.departureminute = "";
  }
}
