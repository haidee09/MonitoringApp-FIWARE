import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonData } from '../../../models/commondata';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-register-list',
  templateUrl: './users-register-list.component.html',
  styleUrls: ['./users-register-list.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterListComponent implements OnInit{
 
  subscriptionList: Subscription;
  collectionUsers: User[];

  constructor(private route: Router, private userService: UserService){
    //this.listUsers();
    //this.listSG();
  }
  ngOnInit(){ 
    this.subscriptionList = this.userService.listUsers().subscribe(
      (res) => {
        this.collectionUsers = res;
        console.log(this.collectionUsers);
      },
      (error)=> {
        console.log(error);
      }
    )
  }
  /*ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }*/

}
