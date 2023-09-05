import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  colorOptions: string[] = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white'];
  selectedColor: string = 'red';
  pseudo: string = 'Pseudo';
  is_available: boolean = true;
  user: User = new User(1,'','','','',new Date(),'','',true,{id:2,type:''});

  constructor() { }

  saveSelectedColor() {

  }



  getUser() {
  fetch('http://localhost:8080/user/1')
    .then(response => response.json())
    .then(data => {this.user = data;
      console.log("voici l'utilisateur :", data);
  });
}

}
