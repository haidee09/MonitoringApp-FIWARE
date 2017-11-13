import { Component, OnInit } from '@angular/core';
import { CommonData } from '../../../models/commondata';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-register-form',
  templateUrl: './users-register-form.component.html',
  styleUrls: ['./users-register-form.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterFormComponent{

  //firstname:any;
  //lastname:any;
  //email:any;
  role:any = null;
  object: CommonData;
  subscription: Subscription;
  collectionUsers: User[];

  constructor(private route: Router, private userService: UserService){
    this.object = new CommonData('','','','');
    
  }
  
  /*listSG(){
    this.sgService.listSG().subscribe(
      (res) => {
        this.collectionSG = res;
        console.log(this.collectionUsers);
      },
      (error)=> {
        console.log(error);
      }
    )
  }*/
  clearInputs(){
    this.object.idUser = '';
    this.object.name = '';
    this.object.lastName = '';
    this.object.email = '';
    this.role = null;
  }
  registerUser(){
    this.subscription = this.userService.createUser(this.object).subscribe(
      (res) => {
        console.log(res);
        this.clearInputs();
        console.log("Usuario registrado con exito");
      },
      (error) => {
        console.log("Hubo un error al guardar los datos del guardia de seguridad");
      }
    )
  }
  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/
}
