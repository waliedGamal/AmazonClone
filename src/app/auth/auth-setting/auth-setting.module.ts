import { PaymentComponent } from '../payment/payment.component';
import { AuthComponent } from './../auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSettingRoutingModule } from './auth-setting-routing.module';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    AuthSettingRoutingModule,
    SharedModule,
    GooglePayButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthSettingModule { }
