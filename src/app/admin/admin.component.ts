import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


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
          console.log(this.users[i].role.type + " " + this.users[i].name);
        }

      });

  }
  onRoleChange(user: User, newRole: string) {
    const newRoleId = newRole === 'ADMIN' ? 1 : 2; // Convertit le rôle en ID (Admin -> 1, User -> 2)

    // Créez le corps de la requête JSON
    const requestBody = {
      id: user.id, // ID de l'utilisateur cible
      role: {
        id: newRoleId, // Nouvel ID de rôle
        type: newRole // Nouveau rôle (Admin ou User)
      }
    };

    // Ici on effectue la requête HTTP PUT
    this.httpClient
    .put(`http://localhost:8080/admin/users/${user.id}/role`, requestBody)
    .pipe(take(1))
    .subscribe(
      () => {
        console.log('Rôle mis à jour avec succès !');
      },
      (error) => {
        console.error('Erreur dans la mise à jour du rôle :', error);
      }
    );
}
}


