import { Component } from '@angular/core';
import { Profil } from '../models/login';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  profil: Profil = new Profil('', '', '');
  isLoginFormVisible: boolean;

  constructor( private http: HttpClient) {
    this.isLoginFormVisible = false;
  }



  onSubmit() {
  
    fetch ('http://localhost:8080/login', {
  
      method: 'POST',
  
      headers: {'Content-Type': 'application/json'},
  
      body: JSON.stringify({
 

        password: this.profil.password,

        email: this.profil.email,

  
      })
    })
  
  .then(response => response.json())
  
  .then(user => {
  

    
    if (user && user.data.token){
            localStorage.setItem('token', user.data.token);
            console.log('user:', user);
    }
    
  
  });
  }




  logIn() {
    console.log('login');
  }

  signUp() {
    console.log('sign up');
  }
}
