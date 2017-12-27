import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '../leaflet-draw/leaflet-draw.module';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { UserService } from '../services/user.service';
import { CampusService } from '../services/campus.service';
import { ZoneService } from '../services/zone.service';
import { AlertService } from '../services/alert.service';
import { SocketAlertsService } from '../services/socket-alerts.service';
import { GeocodingService } from '../services/geocoding.service';
import { SecurityguardService } from '../services/securityguard.service';
//Importar las rutas de este módulo sus  componentes.
//import { PushNotificationComponent } from '../../../node_modules/ng2-notifications/ng2-notifications';
import { UsersRegisterModule } from './users-register/users-register.module';
import { SecurityGuardsModule } from './security-guards/security-guards.module';
import { CampusZonesMapModule } from './campus-zones-map/campus-zones-map.module';
import { AlertsModule } from './alerts/alerts.module';
import { AdminRoutingModule, routableComponents } from './admin-routing.module';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    AdminRoutingModule,
    UsersRegisterModule,
    SecurityGuardsModule,
    CampusZonesMapModule,
    AlertsModule,
    NgxChartsModule,    
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ 
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      autoDismiss: true,
      closeButton: true
    }), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
		LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
    //LeafletDrawModule,
    //LeafletModule
  ],
  declarations: [routableComponents],
  providers:[UserService, CampusService, ZoneService, AlertService, SocketAlertsService, GeocodingService, SecurityguardService]
})
export class AdminModule { }
