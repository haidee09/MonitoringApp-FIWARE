import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonData } from '../../models/commondata';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { log } from 'util';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css'],
  host:{'class':'col-xl-10'}
})
export class UsersRegisterComponent{
  alerts = [];
  connection: any;
  constructor(private alertService:AlertService){}
  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}

