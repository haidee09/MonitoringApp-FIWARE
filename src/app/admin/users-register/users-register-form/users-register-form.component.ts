import { Component, OnInit } from '@angular/core';
import { CommonData } from '../../../models/commondata';
import { Observable } from 'rxjs/Rx';
//import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-register-form',
  templateUrl: './users-register-form.component.html',
  styleUrls: ['./users-register-form.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterFormComponent{

  role:any = null;
  object: CommonData;
  //subscription: Subscription;
  collectionUsers: User[];

  constructor( private userService: UserService,  private toastr: ToastrService){
    this.object = new CommonData('','','','','');
  }  
  clearInputs(){
    this.object.id= '';
    this.object.name = '';
    this.object.lastName = '';
    this.object.email = '';
    this.object.password = "";
    this.role = null;
  }
  registerUser(){
    this.userService.createUser(this.object).subscribe(
      (res) => {
        console.log(res);
        this.clearInputs();
        this.toastr.success('','User successfully registered', { positionClass: 'toast-bottom-full-width' });
        console.log("Usuario registrado con exito");
      },
      (error) => {
        console.log(error);
        console.log("Hubo un error al guardar los datos del usuario");
        this.toastr.error('', 'An error has occurred to save the user data', { positionClass: 'toast-bottom-full-width' })
      }
    )
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
