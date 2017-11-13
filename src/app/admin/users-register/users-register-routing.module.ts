import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersRegisterComponent } from './users-register.component';
import { UsersRegisterFormComponent } from './users-register-form/users-register-form.component';
import { UsersRegisterListComponent } from './users-register-list/users-register-list.component';
//RUtas del modulo Administrador
export const routesUsersRegister: Routes = [  
    
    {path:'users-form-data', component: UsersRegisterFormComponent},
    {path:'users-list', component: UsersRegisterListComponent},
   
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
//Componentes del módulo Users register, se exportan para importarlos en el el archivo users-register.module.ts
export const routableComponentsUsers = [  
 UsersRegisterComponent,
 UsersRegisterFormComponent,
 UsersRegisterListComponent
];

@NgModule({
  imports: [RouterModule.forChild(routesUsersRegister)],
  exports: [RouterModule]
})
export class UsersRegisterRoutingModule { }
