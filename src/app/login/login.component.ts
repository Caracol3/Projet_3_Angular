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


  // onSubmit() {
  //   console.log('formulaire envoyé');
  //   console.log(this.profil.email);
  //   console.log(this.profil.password);
  // }


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
  

    console.log('user:', user);
    if (user && user.data.token){
            localStorage.setItem('token', user.data.token);
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
