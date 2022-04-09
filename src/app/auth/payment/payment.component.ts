import { DataService } from '../../Shared/data.service';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  CartProducts:any[];
  isHovered = false;
  subtotal=0
  TotalDue=0
  amount:string
  Shipping=6.99

  constructor(private tost:NgToastService, private route : Router,private auth:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
      this.remove()
    }
    this.getgrandtotal()
  }

  onPaymentDataAuthorized:google.payments.api.PaymentAuthorizedHandler =(PaymentData) =>{
      return {
        transactionState:'SUCCESS'
      };
  }

  onLoadPaymentData(event:Event){
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    if(eventDetail.detail.paymentMethodData.tokenizationData.token !=null){
      this.tost.success({detail:"successfully checked out with",summary:eventDetail.detail.paymentMethodData.description,duration:2000})
      localStorage.setItem("cart","[]")
      this.auth.success.next(true)
      setTimeout(() => {
        this.route.navigate(['/auth/success'])
      }, 2000);
    }
  }
  getgrandtotal(){
    let sum = 0
    for(let i=0 ;i < this.CartProducts.length; i++){
      sum +=this.CartProducts[i].total
      this.subtotal = sum
      this.TotalDue = this.subtotal + this.Shipping
      this.TotalDue = Math.round(this.TotalDue)
      if(this.CartProducts.length == 0){
        this.subtotal = 0
      }
    }

    this.amount = ''+ Math.round(this.TotalDue)
  }
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

  hide(){
    this.isHovered = true
  }

  show(){
    this.isHovered = false
  }
}
