import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts.component';
import { AlertsMapComponent } from './alerts-map/alerts-map.component';
import { AlertsListComponent } from './alerts-list/alerts-list.component';
//RUtas del modulo Administrador
export const routesAlerts: Routes = [  
    
    {path:'alerts-map', component: AlertsMapComponent},
    {path:'alerts-list', component: AlertsListComponent},   
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Users register, se exportan para importarlos en el el archivo users-register.module.ts
export const routableComponentsAlerts = [  
    AlertsListComponent,
    AlertsMapComponent,
    AlertsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routesAlerts)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }