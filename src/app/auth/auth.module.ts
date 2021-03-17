import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
