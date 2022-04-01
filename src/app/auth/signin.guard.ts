import { NgToastService } from 'ng-angular-popup';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor(private auth:AuthService , private route : Router , private toast:NgToastService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.userData.getValue() !=null){
        this.route.navigate(['/home'])
        this.toast.info({detail:'Success',summary:'Your are already logged in',duration:2000})
        return false;
      }else {
        return true
      }
    }

}
