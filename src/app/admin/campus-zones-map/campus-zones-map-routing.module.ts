import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampusZonesMapComponent } from './campus-zones-map.component';
import { CampusFormComponent } from './campus-form/campus-form.component';
import { ZonesFormComponent } from './zones-form/zones-form.component';
import { DevicesAreaComponent } from './devices-area/devices-area.component';
//RUtas del modulo Administrador
export const routesCampusZones: Routes = [  
    
    {path:'campus-form', component: CampusFormComponent},
    {path:'zones-form', component: ZonesFormComponent},
    {path:'devices-area-form', component: DevicesAreaComponent},
   
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Users register, se exportan para importarlos en el el archivo users-register.module.ts
export const routableComponentsCampusZones = [  
    CampusZonesMapComponent,
    CampusFormComponent,
    ZonesFormComponent,
    DevicesAreaComponent
];

@NgModule({
  imports: [RouterModule.forChild(routesCampusZones)],
  exports: [RouterModule]
})
export class CampusZonesMapRoutingModule { }
