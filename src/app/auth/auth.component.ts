import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.minLength(6)])
  })
  isLoginMode = true;
  isLoading = false;
  error: string;
  constructor( private authService:AuthService , private route:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: FormGroup){
    let email = form.value.email;
    let password = form.value.password;
    this.isLoading = true
    if(this.isLoginMode){
      //... login
      console.log(form);
      if(form.valid){
        if(form.valid){
          this.authService.logIn(email,password).subscribe((resData)=>{
            if(resData.registered == true){
              localStorage.setItem('user',resData.idToken)
              this.authService.saveUserData()
              this.isLoading = false
              setTimeout(() => {
                this.route.navigate(['/home'])
              }, 1500);
            }
          },errorRes =>{
            this.error = errorRes.error.error.message
            this.isLoading = false
          })
        }      }
    }else{
      //... signup
    this.isLoading = true
      if(form.valid){
        this.authService.SignUp(email,password).subscribe(()=>{
          this.isLoading = false
          this.isLoginMode = true
        },errorRes =>{
          this.error = errorRes.error.error.message
          this.isLoading = false
        })
      }
      form.reset()
    }
  }

}
