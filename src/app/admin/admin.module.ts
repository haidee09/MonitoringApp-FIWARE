import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '../leaflet-draw/leaflet-draw.module';
import { UserService } from '../services/user.service';
import { CampusService } from '../services/campus.service';
//Importar las rutas de este módulo sus  componentes.
import { AdminRoutingModule, routableComponents } from './admin-routing.module';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
		LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
    //LeafletDrawModule,
    //LeafletModule
  ],
  declarations: [routableComponents],
  providers:[UserService, CampusService]
})
export class AdminModule { }
