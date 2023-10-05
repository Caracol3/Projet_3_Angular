import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmailInPlaceholderService {

private emailInPlaceholder = new BehaviorSubject<string>('');

  constructor( public dataService : DataService) { }

  onSubmit() {


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
}
