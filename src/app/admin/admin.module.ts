import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
    //LeafletDrawModule,
    //LeafletModule
  ],
  declarations: [routableComponents]
})
export class AdminModule { }
