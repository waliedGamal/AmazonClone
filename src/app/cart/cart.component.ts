import { AuthService } from './../auth/auth.service';
import { DataService } from '../Shared/data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,DoCheck {
  CartProducts:any[];
  Quantity:number = 1;
  subtotal=0
  disableBtn: boolean

  constructor(private Router:Router,private DataService:DataService) { }
  ngOnInit(): void {
    this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
      this.remove()
      this.getgrandtotal()
    }

    if(localStorage.getItem('user') !=null){
      this.disableBtn = false
    }else{
      this.disableBtn = true
    }
  }

  DeleteCart(id:number){
    this.DataService.DeleteCart(id,this.CartProducts,this.subtotal)
  }

  // to get the grand total
  getgrandtotal(){
    let sum = 0
    for(let i=0 ;i < this.CartProducts.length; i++){
      sum +=this.CartProducts[i].total
      this.subtotal = sum
      if(this.CartProducts.length == 0){
        this.subtotal = 0
      }
    }
  }

  // to remove duplicated values in array
  remove(){
    let set = new Set()
    this.CartProducts = this.CartProducts.reduce((value,index)=>{
      if(!set.has(index.id)){
        set.add(index.id)
        value.push(index)
      }
      return value;
    },[])
  }

  toggleMore(id:number,event:any){
    for(let i=0; i < this.CartProducts.length; i++){
      if(this.CartProducts[i].Quantity >= 1){
        if(id == this.CartProducts[i].id){
          this.CartProducts[i].Quantity = event;
          this.CartProducts[i].Quantity ++
          this.CartProducts[i].total = this.CartProducts[i].Quantity * this.CartProducts[i].price
        }
      }
  }
    this.DataService.saveCart(this.CartProducts)
  }

  toggleLess(id:number,event:any){
    for(let i=0; i < this.CartProducts.length; i++){
      if(this.CartProducts[i].Quantity > 1){
        if(id == this.CartProducts[i].id){
          this.CartProducts[i].Quantity = event;
          this.CartProducts[i].Quantity --
          this.CartProducts[i].total = this.CartProducts[i].Quantity * this.CartProducts[i].price
        }
      }
    }
    this.DataService.saveCart(this.CartProducts)
  }

  checkOut(){
    if(this.disableBtn == false){
      this.Router.navigate(['auth/payment'])
    }
  }

}
