import { Component } from '@angular/core';
import { Signin } from '../models/signin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signin: Signin = new Signin('', '', '', new Date(), '', '');
  confirmPassword: string = '';
  isLoginFormVisible: boolean;

  constructor() {
    this.isLoginFormVisible = false;
  }

onSubmit() {
  if (this.signin.password !== this.confirmPassword) {
    return alert('Les mots de passe ne correspondent pas');
    ;
  }

  fetch ('http://localhost:8080/create_user', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      pseudo: this.signin.pseudo,
      firstname: this.signin.firstname,
      name: this.signin.name,
      birthday: this.signin.birthday,
      email: this.signin.email,
      password: this.signin.password,

    }),

  })
.then(response => response.json())
.then(user => console.log("Utilisateur crée : " ,user))
alert('Utilisateur crée');
}


  logIn() {
    console.log('login');
  }

  signUp() {
    console.log('sign up');
  }


}



