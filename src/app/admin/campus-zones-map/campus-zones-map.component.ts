import {   Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Campus } from '../../models/campus';
import { Zone } from '../../models/zone';
import { AlertService } from '../../services/alert.service';
import { CampusService } from '../../services/campus.service';
import { ZoneService } from '../../services/zone.service';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-campus-zones-map',
  templateUrl: './campus-zones-map.component.html',
  styleUrls: ['./campus-zones-map.component.css'],
  host:{'class':'col-xl-10'}
})

export class CampusZonesMapComponent {
  alerts = [];
  connection: any;
  constructor(private alertService:AlertService){}
  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
