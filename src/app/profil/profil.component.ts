import { Component } from '@angular/core';
import { Profil } from '../models/login';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  profil: Profil = new Profil('', '');
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
