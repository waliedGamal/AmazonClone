import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './authData';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private route:Router) {

    if(localStorage.getItem("user") !=null)
    {
      this.saveUserData();
    }
  }

  FirebaseKey='AIzaSyDOuPuLJckbvsCGuHLIyXldSMhkT9AzDH8'
  userData = new BehaviorSubject<string | null>(null)
  success = new BehaviorSubject(false)
  saveUserData(){
    let encodedUserData = JSON.stringify( localStorage.getItem('user'));
    this.userData.next(jwtDecode(encodedUserData))
  }

  SignUp(email:string , password:string){
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FirebaseKey}`,{
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  logIn(email:string , password:string){
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FirebaseKey}`,{
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  logOut(){
    localStorage.removeItem("user")
    localStorage.setItem("cart","[]")
    this.userData.next(null)
    this.route.navigate(['/auth'])
  }


}
