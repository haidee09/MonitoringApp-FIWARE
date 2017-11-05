import { Component, OnInit } from '@angular/core';
import { CommonData } from '../../models/commondata';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


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
  role:any = null;
  object: CommonData;

  constructor(private route: Router, private usserService: UserService){
    this.object = new CommonData('','','');
  }

  clearInputs(){
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.role = null;
  }
  registerData(){
    if(this.role==="user"){

    }
    else if (this.role==="security_guard"){

    }
  }

}
