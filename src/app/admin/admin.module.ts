import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importar las rutas de este módulo sus  componentes.
import { AdminRoutingModule, routableComponents } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  declarations: [routableComponents]
})
export class AdminModule { }
