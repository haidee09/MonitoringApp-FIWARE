import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { SecurityGuardsComponent } from './security-guards/security-guards.component';
import { AccessLogComponent } from './access-log/access-log.component';
import { CampusZonesMapComponent } from './campus-zones-map/campus-zones-map.component';
import { MenuComponent } from './menu/menu.component';

//RUtas del modulo Administrador
export const routes: Routes= [  
  { path: 'admin', redirectTo:'admin/profile-setting'},
  { path: 'admin', component:MenuComponent,
    children:[
      {path:'dashboard', component: DashboardComponent},
      {path:'profile-setting', component: ProfileSettingComponent},
      {path:'users-register', component: UsersRegisterComponent},
      {path:'security-guards', component: SecurityGuardsComponent},
      {path:'campus-zones', component:CampusZonesMapComponent},
      {path:'access-log', component:AccessLogComponent}
    ]
  },  
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Administrador, se exportan para importarlos en el el archivo admin.module.ts
export const routableComponents = [  
  DashboardComponent,
  ProfileSettingComponent,
  UsersRegisterComponent,
  SecurityGuardsComponent,
  AccessLogComponent,
  CampusZonesMapComponent,
  MenuComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
