import { Component } from '@angular/core';
import { Profil } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  profil: Profil = new Profil('', '', '');
  isLoginFormVisible: boolean;

  constructor() {
    this.isLoginFormVisible = false;
  }

  onSubmit() {
    console.log('formulaire envoyé');
    console.log(this.profil.email);
    console.log(this.profil.password);
  }

  logIn() {
    console.log('login');
  }

  signUp() {
    console.log('sign up');
  }
}
