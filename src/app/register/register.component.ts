import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../models/administrator';
import { Company } from '../models/company';
import { AdminService} from '../services/admin.service';
import { CompanyService} from '../services/company.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  admin: Admin;
  company: Company;
  password2: string = '';
  messageAdmin: string = '';
  messageCompany: string = '';
  messagepwd: string = '';
  /*adminExist: boolean = false;
  companyExist: boolean = false;
  successAdmin = null;
  successCompany = null; */
  //successRegistration = null;

  constructor(private adminService: AdminService, private companyService: CompanyService, private router: Router) { 
    this.admin = new Admin('','','','','', '', new Date(), new Date());
    this.company = new Company('','',new Date(), new Date());
    //this.admin = new Admin;
    //this.company = new Company;
  }

  /*onChange(newValue) {
    console.log(newValue);
    this.company.idCompany = newValue;  // don't forget to update the model here;
    //this.admin.refCompany = newValue;
    // ... do other stuff here ...
  }*/

  newRegister(){
    if(this.checkPasswordMatches()){
      this.readAdmin();
      this.readCompany();
      if(this.messageAdmin===''){
        this.registerAdmin();      
      }
      if(this.messageCompany==='')
      {
        this.registerCompany();   
      }        
    }   
    else{
      this.messagepwd = "The passwords not matches";
      //this.successRegistration = false;
      console.log(this.messagepwd);
    }
  }
  checkPasswordMatches(){
    if(this.admin.password === this.password2)
      return true
    else
      return false
  }
  readAdmin(){
    //let adminExist = this.adminExist
    this.adminService.readAdmin(this.admin.idAdministrator).subscribe(
      (res) => {
        //adminExist = true
        if(res==null){
          //console.log(res);
        }
        else{
          /*if(res['email'] == this.admin.email ) {
            this.message = this.message+"The email is already registreted";
            console.log(this.message);
          } */
          this.messageAdmin = "Admin ID already existis";
          //this.adminExist= true;
          console.log(this.messageAdmin);
         // console.log(this.adminExist);
        }      
      },
      (error) => {
        console.log(error);
      }
    );
    //return adminExist;
  }
  readCompany(){
    //let companyExist = this.companyExist
    this.companyService.readCompany(this.admin.refCompany).subscribe(
      (res) => {
        /*if(res['success'] == true ) {
          this.message = res['message'];
          console.log(this.message);
          //this.router.navigate(['']);
        } */
        //companyExist = true
        if(res==null){
          //console.log(res);
        }
        else{
          //his.companyExist = true
          //console.log(this.companyExist)
          this.messageCompany =" Company ID already existis";        
          console.log(this.messageCompany);
        }        
      },
      (error) => {
        console.log(error);
      }
    );
    //return companyExist;
  }

  registerAdmin() {
      this.company.idCompany = this.admin.refCompany;
      this.adminService.createAdmin(this.admin).subscribe(
        (res) => {
          /*if(res['success'] == true ) {
            this.message = res['message'];
            console.log(this.message);
            //this.router.navigate(['']);
          } */
          if(res==null){
          // console.log(res);
          }
          else{
              this.messageAdmin = "New User Admin Created"
              console.log(this.messageAdmin);
          } 
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
  registerCompany() {
    this.companyService.createCompany(this.company).subscribe(
      (res) => {
        /*if( res['success'] == true ) {
          this.message = res['message'];
          //this.router.navigate(['']);
        } 
        else {
          this.message = res['message'];
        }*/
        if(res==null){
          //console.log(res);
        }
        else{
          
            this.messageCompany = "New company created"
            console.log(this.messageCompany);
          //console.log(this.successCompany)
          //this.message = this.message+" Company ID already existis";        
          //console.log(this.message);
        } 
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
