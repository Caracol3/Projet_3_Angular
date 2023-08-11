import { Component } from '@angular/core';
import { Signin } from '../models/signin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signin: Signin = new Signin('', '', '');
  isLoginFormVisible: boolean;

  constructor() {
    this.isLoginFormVisible = false;
  }

onSubmit() {
  fetch ('http://localhost:8080/create_user', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: this.signin.name,
      email: this.signin.email,
      password: this.signin.password,

    }),

  })
.then(response => response.json())
.then(user => console.log("Salut" ,user))
}
  // onSubmit() {
  //   console.log('formulaire envoyé');
  //   console.log(this.profil.email);
  //   console.log(this.profil.password);
  // }

  logIn() {
    console.log('login');
  }

  signUp() {
    console.log('sign up');
  }


}



