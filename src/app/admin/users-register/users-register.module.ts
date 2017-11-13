import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersRegisterRoutingModule, routableComponentsUsers } from './users-register-routing.module';


@NgModule({
  imports: [
    CommonModule, 
    BrowserAnimationsModule,
    UsersRegisterRoutingModule, // required animations module   
    FormsModule, ReactiveFormsModule
  ],
  declarations: [routableComponentsUsers],
  providers:[]
})
export class UsersRegisterModule { }