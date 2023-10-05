import { Component } from '@angular/core';
import { Signin } from '../models/signin';
import { tap } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { TokenValidationService } from '../token-validation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signin: Signin = new Signin('', '', '', new Date(), '', '');
  confirmPassword: string = '';
  isLoginFormVisible: boolean;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private tokenValidationService: TokenValidationService
  ) {
    this.isLoginFormVisible = false;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      window.alert('Tous les champs ne sont pas remplis correctement.');
      console.log(form.value);
      return;
    }

    if (this.signin.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    fetch(`${this.dataService.serveUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.signin.name,
        password: this.signin.password,
        email: this.signin.email,
        birthday: this.signin.birthday,
        firstname: this.signin.firstname,
        username: this.signin.pseudo,
      }),
    })
      .then((response) => response.json())

      .then((user) => {});

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/search-train']);

    console.log(this.signin.password);
  }

  returnSalon() {
    this.location.back();
  }
  logIn() {
    console.log('login');
  }

  signUp() {
    console.log('sign up');
  }
}
