import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User[]>('http://localhost:8080/admin/users')
      .subscribe(users => {
        this.users = users;
        for(let i=0; i<this.users.length; i++){
          console.log(this.users[i].role.type + " " + this.users[i].pseudo);
        }

      });

  }
}

