import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MenuComponent } from './admin/menu/menu.component';
import { AdminRoutingModule} from './admin/admin-routing.module';
import { AuthService } from 'app/services/auth.service';
//Rutas globales de la aplicación 
const appRoutes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpwd', component: ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    /*AuthGuardAdmin,
    AuthGuardUsuario,
    LoginActivate*/
    AuthService
  ]
})
export class AppRoutingModule {}
