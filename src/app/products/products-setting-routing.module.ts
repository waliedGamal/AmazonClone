import { IdReSolverService } from './../Shared/id-resolver.service';
import { NotfoundComponent } from './../notfound/notfound.component';
import { CartComponent } from './../cart/cart.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  {path:':id',component:ProductinfoComponent,resolve:{id:IdReSolverService}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsSettingRoutingModule { }
