import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { DataService } from '../data.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],


})
export class AdminComponent implements OnInit {
  users: User[] = [];
  isMoreInfo :boolean = false;
  selectedUser: any;


  constructor(private httpClient: HttpClient, private dataService : DataService) {}

  // Au chargement du composant, on récupère la liste des utilisateurs

  ngOnInit(): void {
    this.refreshUsersList();

  }


  refreshUsersList() {
    this.httpClient.get<User[]>(`${this.dataService.serveUrl}/admin/users`).subscribe((users) => {
      this.users = users;
     
    });
  }
  //pour formater la date

   formatDate(dateISO: string): string {
    const birthdayDate = new Date(dateISO);
    const jour = birthdayDate.getDate().toString().padStart(2, '0');
    const mois = (birthdayDate.getMonth() + 1).toString().padStart(2, '0');
    const annee = birthdayDate.getFullYear();
    return jour + '/' + mois + '/' + annee;
  }

  moreInfo(user: any) {
    this.isMoreInfo = true;
    user.birthday = this.formatDate(user.birthday);
    this.selectedUser = user;
  }
  closeInfo(){
    this.isMoreInfo = false;


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
    .put(`${this.dataService.serveUrl}/admin/users/${user.id}/role`, requestBody)
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
deleteUser(userId: number) {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (confirmDelete) {
    // L'utilisateur a confirmé la suppression, envoyez la requête DELETE
    this.httpClient
      .delete(`${this.dataService.serveUrl}/admin/users/${userId}`)
      .pipe(take(1))
      .subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès !');

          // Rafraîchissez la liste des utilisateurs après la suppression.
          this.refreshUsersList();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
      );
  } else {
    // L'utilisateur a annulé la suppression
    console.log('Suppression annulée.');
  }
}

}
