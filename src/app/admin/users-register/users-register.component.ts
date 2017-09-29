import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterComponent{

  firstname:any;
  lastname:any;
  email:any;
  role:any;
  clearInputs(){
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.role = this.role.value;
  }

}
