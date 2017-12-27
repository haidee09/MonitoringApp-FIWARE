import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../models/administrator';
import { Company } from '../models/company';
import { AdminService} from '../services/admin.service';
import { CompanyService} from '../services/company.service';
import { AlertService } from '../services/alert.service';
import { ToastrService } from 'ngx-toastr';


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
  alerts = [];
  connection: any;
 
  constructor(
    private adminService: AdminService, 
    private companyService: CompanyService, 
    private router: Router, 
    private alertService:AlertService,
    private toastr: ToastrService
  ) { 
    this.admin = new Admin('','','','','', '', new Date(), new Date());
    this.company = new Company('','',new Date(), new Date());
    //this.admin = new Admin;
    //this.company = new Company;
  }

  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }
  clearInputs(){
    this.admin.id= '';
    this.admin.name = '';
    this.admin.lastName = '';
    this.admin.refCompany= '';
    this.admin.email = '';
    this.admin.password = '';
    this.password2 = '';
    this.company.name = '';
  }
  newRegister(){
    if(this.checkPasswordMatches()){
      /*this.readAdmin();
      this.readCompany();*/
      this.registerAdmin();      
      this.registerCompany(); 
      this.clearInputs(); 
      /*if(this.messageAdmin===''){
        this.registerAdmin();      
      }
      if(this.messageCompany==='')
      {
        this.registerCompany();   
      } */       
    }   
    else{
      this.messagepwd = "The passwords not matches";
      console.log(this.messagepwd);
      this.toastr.warning('', this.messagepwd, { positionClass: 'toast-top-full-width' })
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
    this.adminService.readAdmin(this.admin.id).subscribe(
      (res) => {
        //adminExist = true
        if(res==null){
          //console.log(res);
        }
        else{
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
        if(res==null){
          //console.log(res);
        }
        else{
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
    this.company.id = this.admin.refCompany;
    this.adminService.createAdmin(this.admin).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('','Admin successfully registered', { positionClass: 'toast-top-full-width' });
        console.log("Admin registrado con exito");
        this.messageAdmin = "New User Admin Created"
        console.log(this.messageAdmin); 
      },
      (error) => {
        console.log(error);
        console.log("Hubo un error al guardar los datos del administrador");
        this.toastr.error('', `An error has occurred to save the administrator data: ${error.message}`, { positionClass: 'toast-top-full-width' })
      }
    );
  }
  
  registerCompany() {
    this.companyService.createCompany(this.company).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('','Company successfully registered', { positionClass: 'toast-top-full-width' });
        console.log("Company registrado con exito");
        this.messageCompany = "New company created"
        console.log(this.messageCompany); 
      },
      (error) => {
        console.log(error);
        console.log("Hubo un error al guardar los datos de la compañia");
        this.toastr.error('', `An error has occurred to save the company data: ${error.message}`, { positionClass: 'toast-top-full-width' })
      }
    )
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
