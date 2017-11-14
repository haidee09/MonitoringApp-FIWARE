import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuardsComponent } from './security-guards.component';
import { SecurityGuardsFormComponent } from './security-guards-form/security-guards-form.component';
import { SecurityGuardsListComponent } from './security-guards-list/security-guards-list.component';
//RUtas del modulo Administrador
export const routesSecurityGuards: Routes = [  
    
    {path:'sg-form-data', component: SecurityGuardsFormComponent},
    {path:'sg-list', component: SecurityGuardsListComponent},
   
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Users register, se exportan para importarlos en el el archivo users-register.module.ts
export const routableComponentsSG = [  
    SecurityGuardsComponent,
    SecurityGuardsFormComponent,
    SecurityGuardsListComponent
];

@NgModule({
  imports: [RouterModule.forChild(routesSecurityGuards)],
  exports: [RouterModule]
})
export class SecurityGuardsRoutingModule { }
