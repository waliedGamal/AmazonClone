import { Product } from '../Shared/products';
import { DataService } from '../Shared/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnDestroy  {
  Products:Product[]
  CartProducts:Product[]
  category:string
  searchKey:string
  priceCount:number
  allSub : Subscription
  isLoading = false;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.GetProducts()
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
    }
  }

  GetProducts(){
    this.isLoading = true
    this.allSub = this.dataService.GetProducts().subscribe((res)=>{
      this.Products = res
      if(this.Products != null){
      this.isLoading = false
      }
    })
  }

  AddToCart(product:Product){
    this.dataService.AddToCart(product,this.CartProducts)
  }
  // get the value of category and store it to use it for filtering pipe
  getSearchKey(type:any) {
    this.isLoading = true
    this.searchKey = type.target.attributes[1].nodeValue
    if(this.searchKey != null){
      this.isLoading = false
    }
  }
  //unSubscribe the obs
  ngOnDestroy(): void {
      this.allSub.unsubscribe()
  }
}
