import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [

  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},

  {path:"products",
  loadChildren:()=>import('./products/products-setting.module').then(m => m.ProductsSettingModule)
  },

  {path:"auth",
  loadChildren:()=>import ('./auth/auth-setting/auth-setting.module').then(m => m.AuthSettingModule)
  },

  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
