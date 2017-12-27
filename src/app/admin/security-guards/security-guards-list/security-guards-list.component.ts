import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityguardService } from '../../../services/securityguard.service';
import { SecurityGuard } from '../../../models/securityguard';


@Component({
  selector: 'app-security-guards-list',
  templateUrl: './security-guards-list.component.html',
  styleUrls: ['./security-guards-list.component.css']
})
export class SecurityGuardsListComponent implements OnInit {

  //subscriptionList: Subscription;
  collectionSG: SecurityGuard[];

  constructor(private route: Router, private sgService: SecurityguardService){
    //this.listUsers();
    //this.listSG();
  }
  listSG(){
    this.sgService.listSG().subscribe(
      (res) => {
        this.collectionSG = res;
        console.log(this.collectionSG);
      },
      (error)=> {
        console.log(error);
      }
    )
  }
  ngOnInit(){ 
    this.listSG();
  }
  deleteSG(itemID: string){
    //PETICION DE LAS ALERTAS NUEVAMENTE
    this.collectionSG = [];
    this.sgService.deleteSG(itemID).subscribe(
      (res) => {
        console.log(res);
        this.listSG();
      },
      (error) =>{
        console.log(error);
      }
    )   
  }
}
