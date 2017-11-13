import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  login(){
    if(this.email === "admin@cenidet.edu.mx" && this.password === "admin12345"){
      this.router.navigate(['/admin']);
    }
    else{
      console.log("Contraseña incorrecta")
    }
  }
}
