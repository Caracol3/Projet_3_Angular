import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from '../models/login';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  profil: Profil = new Profil('', '', '');
  isLoginFormVisible: boolean;

  constructor(private router: Router, private accountService: AccountServiceService) {
    this.isLoginFormVisible = false;
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/search-train']);
    }
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
    console.log('user:', user);
    if (user && user.data.token){
            localStorage.setItem('token', user.data.token);
            this.router.navigate(['/search-train']);
            this.accountService.getUserData(user.data.user.id);
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
