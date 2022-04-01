import { BehaviorSubject } from 'rxjs';
import { Product } from '../../Shared/products';
import { DataService } from '../../Shared/data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.scss']
})
export class ProductinfoComponent implements OnInit,DoCheck {

  constructor(private _ActivatedRoute:ActivatedRoute , private _DataService:DataService , private route:Router) { }
  id:number=0;
  Product:Product
  CartProducts:Product[]
  relatedProducts:Product[]
  ProductCategory =  new BehaviorSubject('');
  ngOnInit(): void {
    this.productInfo()
    this.GetCategory()
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
    }
  }
  //to get the single Product using id
  productInfo(){

    // * get the id with route.params.subscribe
    // this._ActivatedRoute.params.subscribe((Params:Params)=>{
    //   this.id = Params['id'] - 1
    //   this._DataService.GetProductDetails(this.id).subscribe((res)=>{
    //     this.Product = res
    //     this.ProductCategory.next(this.Product.category)
    //   })
    // })

    // * getting the id with resolver service much better to make sure the component has id !!
    this._ActivatedRoute.data.subscribe((data:Data)=>{
      this.id = data['id'].id -2
      this.Product = data['id']
        this._DataService.GetProductDetails(this.id).subscribe((res)=>{
          this.Product = res
          this.ProductCategory.next(this.Product.category)
        })

    })
  }

  AddToCart(product:any){
    this._DataService.AddToCart(product,this.CartProducts)
  }


  // ! get category using firebase so i had to send the object , index and key to each category
  // *                      index / category / key of the object
  // * ex->" baseurl/category/${1}/${jewelery}/${MyWOBOCRmQhJAI2hEbb}

  GetCategory(){
      let index = 0;
      let key = '';
      this.ProductCategory.subscribe((category)=>{
        if(category == "electronics"){
          index = 0;
          key = '-MyWOBOCRmQhJAI2hEbb'
        }
        else if(category == "jewelery"){
          index = 1;
          key = '-MyWTmAZsJ8OitqP9ics'
        }
        else if(category == "men's clothing"){
          index = 2;
          key = '-MyWU_-OBjiAc9l0dVXo'
        }
        else if(category == "women's clothing"){
          index = 3;
          key = '-MyWVJDFlxIiFZJAw4Ka'
        }
      })
    this.ProductCategory.subscribe(()=>{
      this._DataService.GetCategory(index,this.ProductCategory.value,key).subscribe((res)=>{
        this.relatedProducts = res
      })
    })
  }


}
