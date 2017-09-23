import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { MenuComponent } from './menu/menu.component';
//RUtas del modulo Administrador
const routes: Routes = [
  { path: 'admin', redirectTo:'admin/dashboard'},
  { path: 'admin', component: MenuComponent, 
    children:[
      {path:'dashboard', component: DashboardComponent},
      {path:'profile-setting', component: ProfileSettingComponent},
      {path:'users-register', component: UsersRegisterComponent}
    ]
  },  
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Administrador, se exportan para importarlos en el el archivo admin.module.ts
export const routableComponents = [  
  DashboardComponent,
  ProfileSettingComponent,
  UsersRegisterComponent,
  MenuComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
