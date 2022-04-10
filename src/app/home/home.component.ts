import { DataService } from './../Shared/data.service';
import { Product } from '../Shared/products';
import { Router } from '@angular/router';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import SwiperCore , { SwiperOptions ,Navigation ,Autoplay } from 'swiper';
import { Subscription } from 'rxjs';
SwiperCore.use([Navigation,Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,DoCheck , OnDestroy{

  constructor(public _DataService:DataService ,public Router:Router) { }
  SliderBackGround:string[]=["slider1.jpg","slider2.jpg","slider3.jpg","slider4.jpg","slider5.jpg","slider6.jpg","slider7.jpg","slider8.jpg"];
  path="../../assets/slider/"
  Products:Product[];
  LatestProducts:Product[]
  Cart:Product[]=[];
  CartButton:boolean=true;
  display: boolean = false;
  isLoading = false;
  latestSub : Subscription
  allSub : Subscription
  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      },
  };

  ngOnInit(): void {
    this.GetProducts()
    this.getLatestProducts()
    this.getslider()
  }
  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.Cart = JSON.parse(localStorage.getItem("cart") || '')
  }
}
  // ?to get the latest products : using category
  getLatestProducts(){
    this.isLoading = true
    this.latestSub = this._DataService.GetCategory(2,"men's clothing","-MyWU_-OBjiAc9l0dVXo").subscribe((data)=>{
      this.LatestProducts = data
      if(this.LatestProducts != null){
        this.isLoading = false
      }
    })
  }
  // to get the all products
  GetProducts(){
    this.isLoading = true
    this.allSub = this._DataService.GetProducts().subscribe((res)=>{
      this.Products = res
      this.Products = this.Products.slice(4,20)
      if(this.Products != null){
        this.isLoading = false
      }
    })
  }
  // add to cart using service & localStorage (singleProduct , products [])
  AddToCart(product:any){
    this._DataService.AddToCart(product,this.Cart)
  }

  getslider(){
    
  }

  //unSubscribe the obs
  ngOnDestroy(): void {
    this.latestSub.unsubscribe()
    this.allSub.unsubscribe()
  }
}
