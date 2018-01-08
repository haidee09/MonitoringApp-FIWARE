import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'app/models/administrator';
import { AuthService }  from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  email: string;
  password: string;
  user_status: boolean;
  message: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  login(){
    let admin = {
      email: this.email,
      password: this.password
    }
    this.authService.loginUser(admin).subscribe(res => {
      this.user_status = res['success'];
      if(res['success'] == true) {
        this.authService.setAdmin(res['user']);
        this.message = res['message'];
        //Aqui se redirecciona a otro componente para poder mostrar las siguientes paginas
        this.router.navigate(['/admin']);
      } 
      else {
        this.message = res['message'];
      }
    });
    /*
    if(this.email === "admin@cenidet.edu.mx" && this.password === "admin12345"){
      this.router.navigate(['/admin']);
    }
    else{
      console.log("Contraseña incorrecta")
    }
    */
  }
}
