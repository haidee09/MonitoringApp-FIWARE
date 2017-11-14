import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityGuardsRoutingModule, routableComponentsSG } from './security-guards-routing.module';


@NgModule({
  imports: [
    CommonModule, 
    BrowserAnimationsModule,
    SecurityGuardsRoutingModule, // required animations module   
    FormsModule, ReactiveFormsModule
  ],
  declarations: [routableComponentsSG],
  providers:[]
})
export class SecurityGuardsModule { }