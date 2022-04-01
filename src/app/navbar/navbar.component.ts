import { Router } from '@angular/router';
import { Product } from '../Shared/products';
import { DataService } from '../Shared/data.service';
import { Component, OnInit,DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit ,DoCheck {

  constructor(public DataService:DataService, private route:Router , private auth:AuthService) { }
  cartCount:Product[]=[]
  Products:Product[]=[]
  name:string;
  userName:any
  searchKey:string
  hideSearch = false
  isAuth = false
  searchForm = new FormGroup({ search : new FormControl('') })

  ngOnInit(): void {
    this.getProducts()

    this.auth.userData.subscribe(()=>{
      if(this.auth.userData.getValue() !=null){
        this.isAuth = false
        this.userName = this.auth.userData.getValue()
        this.userName = this.userName.email
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
    this.DataService.GetProducts().subscribe((res)=>{
      this.Products = res
    })
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
}
