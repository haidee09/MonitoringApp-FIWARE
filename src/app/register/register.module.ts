import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HeaderfooterModule } from '../headerfooter/headerfooter.module';
import { RegisterComponent } from './register.component';
import { RouterModule, Router } from '@angular/router';
import { AdminService} from '../services/admin.service';
import { CompanyService} from '../services/company.service';
//import { UsuarioModule } from '../usuario/usuario.module';
//import { AdministradorModule} from '../administrador/administrador.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HeaderfooterModule,
    RouterModule
    //UsuarioModule,
    //AdministradorModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports:[
    RegisterComponent
  ],
  providers: [AdminService, CompanyService]
})
export class RegisterModule { }