import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../Shared/products';
import { DataService } from '../Shared/data.service';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit ,DoCheck ,OnDestroy{

  constructor(public DataService:DataService, private route:Router , private auth:AuthService) { }
  cartCount:Product[]=[]
  Products:Product[]=[]
  name:string;
  userName:any
  searchKey:string
  hideSearch = false
  isAuth = false
  allSub : Subscription
  path='gs://clone-5bf01.appspot.com/imgs/Amazon_logo.dark.svg.png'
  searchForm = new FormGroup({ search : new FormControl('') })

  ngOnInit(): void {
    this.getProducts()

    this.auth.userData.subscribe(()=>{
      if(this.auth.userData.getValue() !=null){
        this.isAuth = false
        this.userName = this.auth.userData.getValue()
        if(this.userName.name){
          this.userName = this.userName.name
        }else{
          this.userName = this.userName.email
        }
      }else{
        this.isAuth = true
      }
    })

  }

  ngDoCheck(): void {
    if(localStorage.getItem("cart") != null){
      this.cartCount = JSON.parse(localStorage.getItem("cart") || '')
      this.remove()
    }
  }

  getProducts(){
  this.allSub = this.DataService.GetProducts().subscribe((res)=>{
      this.Products = res
    })
    if(this.name == ''){
      this.allSub.unsubscribe()
    }
  }

  remove(){
    let set = new Set()
    this.cartCount = this.cartCount.reduce((value:Product[],index)=>{
      if(!set.has(index.id)){
        set.add(index.id)
        value.push(index)
      }
      return value;
    },[])
  }

  navigateProduct(id:number){
    this.route.navigate(['/products',id])
    this.name = ''
    if(this.name == ''){
      this.allSub.unsubscribe()
    }
  }

  hide(){
    this.hideSearch = true
  }

  show(){
    this.hideSearch = false
  }

  logOut(){
    this.auth.logOut()
  }

  //unSubscribe the obs
  ngOnDestroy(): void {
    if(this.name == ''){
      this.allSub.unsubscribe()
    }
  }
}
