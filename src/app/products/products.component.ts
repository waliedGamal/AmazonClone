import { Product } from '../Shared/products';
import { DataService } from '../Shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {
  Products:Product[]
  CartProducts:Product[]
  category:string
  searchKey:string
  priceCount:number
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.GetProducts()
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
    }
  }

  GetProducts(){
    this.dataService.GetProducts().subscribe((res)=>{
      this.Products = res
    })
  }

  AddToCart(product:Product){
    this.dataService.AddToCart(product,this.CartProducts)
  }
  // get the value of category and store it to use it for filtering using pipe
  getSearchKey(type:any) {
    this.searchKey = type.target.attributes[1].nodeValue
  }

}
