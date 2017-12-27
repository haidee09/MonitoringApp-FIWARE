import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { CampusZonesMapRoutingModule, routableComponentsCampusZones } from './campus-zones-map-routing.module';


@NgModule({
  imports: [
    CommonModule, 
    BrowserAnimationsModule,
    CampusZonesMapRoutingModule, // required animations module   
    FormsModule, ReactiveFormsModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  declarations: [routableComponentsCampusZones],
  providers:[]
})
export class CampusZonesMapModule { }