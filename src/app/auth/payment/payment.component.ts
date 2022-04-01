import { DataService } from '../../Shared/data.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit ,DoCheck {
  CartProducts:any[];
  isHovered = false;
  subtotal=0
  TotalDue=0
  Shipping=6.99

  paymentRequest:google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: `100`,
      currencyCode: 'USD',
      countryCode: 'US'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']
  }

  constructor(private auth:AuthService, private tost:NgToastService, private route : Router, private dataService:DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem("cart") != null){
      this.CartProducts = JSON.parse(localStorage.getItem("cart") || '')
      this.remove()
    }
  }
  ngDoCheck(): void {
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
      this.tost.success({detail:"successfully checked out with",summary:eventDetail.detail.paymentMethodData.description,duration:2500})
      localStorage.setItem("cart","[]")
      setTimeout(() => {
        this.route.navigate(['/products'])
      }, 2600);
    }
  }
  getgrandtotal(){
    let sum = 0
    for(let i=0 ;i < this.CartProducts.length; i++){
      sum +=this.CartProducts[i].total
      this.subtotal = sum
      this.TotalDue = this.subtotal + this.Shipping
      if(this.CartProducts.length == 0){
        this.subtotal = 0
      }
    }
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
