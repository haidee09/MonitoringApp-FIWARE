import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsRoutingModule, routableComponentsAlerts } from './alerts-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
//import { AlertsMapComponent } from './alerts-map/alerts-map.component';
//import { AlertsListComponent } from './alerts-list/alerts-list.component';

@NgModule({
  imports: [
    CommonModule, 
    BrowserAnimationsModule, // required animations module   
    LeafletModule,
    LeafletDrawModule,
    NgxPaginationModule,
    AlertsRoutingModule, 
    FormsModule, ReactiveFormsModule
  ],
  declarations: [routableComponentsAlerts],
  providers:[]
})
export class AlertsModule { }