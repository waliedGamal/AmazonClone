import { SuccessComponent } from './../success/success.component';
import { SigninGuard } from './../signin.guard';
import { AuthComponent } from './../auth.component';
import { PaymentComponent } from '../payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'',canActivate:[SigninGuard],component:AuthComponent},
  {path:'payment',canActivate:[AuthGuard],component:PaymentComponent},
  {path:'success',canActivate:[AuthGuard],component:SuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthSettingRoutingModule { }
