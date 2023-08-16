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
  user: User = new User('','','','',new Date(),'','');

  constructor() { }

  saveSelectedColor() {

  }

  editPseudo() {

  }

  getUser() {
  fetch('http://localhost:8080/user/3')
    .then(response => response.json())
    .then(data => {this.user = data;
      console.log("voici l'utilisateur :", data);
  });
}

}
