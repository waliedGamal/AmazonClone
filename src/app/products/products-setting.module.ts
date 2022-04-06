import { CartComponent } from './../cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSettingRoutingModule } from './products-setting-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { ProductsComponent } from './products.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductinfoComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductsSettingRoutingModule,
    SharedModule,
    MatSliderModule
  ]
})
export class ProductsSettingModule { }
