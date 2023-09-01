import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor() {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('');
    return token !== null;
  }
}
