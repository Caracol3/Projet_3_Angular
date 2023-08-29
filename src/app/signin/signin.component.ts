import { Component } from '@angular/core';
import { Signin } from '../models/signin';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signin: Signin = new Signin('', '', '', new Date(), '', '');
  confirmPassword: string = '';
  isLoginFormVisible: boolean;
 


  constructor(private http: HttpClient) {
    this.isLoginFormVisible = false;
   }


   onSubmit() {

    if (this.signin.password !== this.confirmPassword) {
  
      return alert('Les mots de passe ne correspondent pas');
  
      ;
  
    }
   
  
    fetch ('http://localhost:8080/register', {
  
      method: 'POST',
  
      headers: {'Content-Type': 'application/json'},
  
      body: JSON.stringify({

        name: this.signin.name,

        password: this.signin.password,

        email: this.signin.email,

        birthday: this.signin.birthday,

        firstname: this.signin.firstname,
  
        username: this.signin.pseudo,
  
      })
    })
  
  .then(response => response.json())
  .then(user => {
  

    
    if (user && user.data.token){
            localStorage.setItem('token', user.data.token);
    }

  
    logIn() {
  
      console.log('login');
  
    }
  
   
  
    signUp() {
  
      console.log('sign up');
  
    }
  
   
  
   



  
  }






