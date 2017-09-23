import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Importar las rutas de este módulo sus  componentes.
import { AdminRoutingModule, routableComponents } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [routableComponents]
})
export class AdminModule { }
