import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonData } from '../../../models/commondata';
import { Observable } from 'rxjs/Rx';
//import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-register-list',
  templateUrl: './users-register-list.component.html',
  styleUrls: ['./users-register-list.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterListComponent implements OnInit{
 
  //subscriptionList: Subscription;
  collectionUsers: User[] = [];

  constructor(private userService: UserService){
  }
  listUsers(){
    this.userService.listUsers().subscribe(
      (res) => {
        this.collectionUsers = res;
        console.log(this.collectionUsers);
      },
      (error)=> {
        console.log(error);
      }
    )
  }
  ngOnInit(){ 
   this.listUsers();
  }
  /*ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }*/
  deleteUser(itemID: string){
    //PETICION DE LAS ALERTAS NUEVAMENTE
    this.collectionUsers = [];
    this.userService.deleteUser(itemID).subscribe(
      (res) => {
        console.log(res);
        this.listUsers();
      },
      (error) =>{
        console.log(error);
      }
    )   
  }
  updateUserData(){

  }
  viewUserInfo(){

  }
}
