import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }

  messages: any[] = [];
  allUsers: any[] = [];


  refreshMessages() {

     this.http
    .get<any>(`http://localhost:8080/all-messages-mp`)
    .subscribe((data) => {
      this.messages = data;
        });

    return this.messages;
  }

  findUser() {
    this.http.get<any>(`http://localhost:8080/admin/users`)
    .subscribe((data) => {
      this.allUsers = data;
        });

  }






}
