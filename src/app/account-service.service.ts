import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  user: any;

  constructor(private http: HttpClient) { }

   getUserData(id: number) {
    this.http.get('http://localhost:8080/user/' + id).subscribe((response) => {
      console.log(response);
      this.user = response;
    })
  }
}
