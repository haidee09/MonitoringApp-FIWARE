import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
//Rutas globales de la aplicación 
const appRoutes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpwd', component: ForgotpasswordComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    AdminRoutingModule
  ],
  exports: [ 
    RouterModule
  ],
  providers: [
    /*AuthGuardAdmin,
    AuthGuardUsuario,
    LoginActivate*/
  ]
})
export class AppRoutingModule {}
