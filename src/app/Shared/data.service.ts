import { Product } from './products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  category = new BehaviorSubject<Product[]>([]);
  Firebase='https://clone-5bf01-default-rtdb.firebaseio.com'
  constructor(public _HttpClient:HttpClient, private toast:NgToastService) {}

  // to get the all products
  GetProducts():Observable<Product[]>{
    return this._HttpClient.get<Product[]>(`${this.Firebase}/products.json`);
  }

  // to get the single products
  GetProductDetails(id:number):Observable<any>{
    return this._HttpClient.get(`${this.Firebase}/products/${id}.json`);
  }

  // to get the all products
  GetCategory(index:number,type:string,key:string){
    return this._HttpClient.get<Product[]>(`${this.Firebase}/categories/${index}/${type}/${key}.json`)
  }
  //save cart to localStorage
  saveCart(product:Product[]){
    localStorage.setItem("cart",JSON.stringify(product))
  }
  // add to cart using service & localStorage (singleProduct , products [])
  AddToCart(product:Product,CartProduct:Product[]){
    product.Quantity = 1
    product.total = product.Quantity * product.price
    for(let i=0; i<CartProduct.length; i++){
      if(CartProduct[i].id == product.id){
        CartProduct[i].Quantity++
        CartProduct[i].total = CartProduct[i].Quantity * CartProduct[i].price
      }
    }
    CartProduct.push(product)
    this.saveCart(CartProduct)
    this.toast.success({detail:'Success',summary:'Added To Your Cart',duration:1500})
  }

  //delete cart by id
  DeleteCart(id:number,CartProducts:Product[],subtotal:number){
    CartProducts.splice(id,1)
    this.saveCart(CartProducts)
    this.toast.error({detail:'success',summary:'Deleted Form Cart',duration:1500})
    if(CartProducts.length == 0){
      subtotal = 0
      }
  }

}
