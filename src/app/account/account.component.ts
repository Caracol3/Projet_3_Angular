import { Component, Inject, OnInit } from '@angular/core';
import { User_info } from '../models/user_info';
import { HttpClient } from '@angular/common/http';
import { AccountServiceService } from '../account-service.service';
import { AuthService } from '../service/AuthService';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  colorOptions: string[] = [
    'FFA500',
    'FF6B81',
    'FF5733',
    '9B59B6',
    '3498DB',
    '2ECC71',
    '6D6D6D',
  ];
  selectedColor: string = 'red';
  pseudo: string = 'Pseudo';
  user_id: string | null = localStorage.getItem('userId');
  is_available: boolean = true;
  isModalOpen: boolean = false;
  routeAvatar: string = 'assets/avatar/';
  user: any = {};
  avatar: string = "";
  avatarOptions: string[] = [
    'arbre.png',
    'AvatarF1.png',
    'AvatarF4.png',
    'AvatarF6.png',
    'AvatarF8.png',
    'AvatarF9.png',
    'AvatarF11.png',
    'AvatarF13.png',
    'AvatarF15.png',
    'AvatarH1.png',
    'AvatarH3.png',
    'AvatarH4.png',
    'AvatarH7.png',
    'AvatarH10.png',
    'AvatarH11.png',
    'AvatarH13.png',
    'AvatarH14.png',
    'bff.png',
    'chat-noir.png',
    'chat.png',
    'chevalier.png',
    'chien1.png',
    'chien2.png',
    'dragon.png',
    'lapin.png',
    'licorne2.png',
    'oiseau.png',
    'princesse.png',
    'roi.png',
    'viking.png',
  ];




  constructor(
    private httpClient: HttpClient,
    private accountService: AccountServiceService,
    private authService: AuthService,
  ) {}

  openAvatarModal() {
    this.isModalOpen = true;
  }

  putAvatar(avatar: string) {
   this.httpClient
      .put<any>(
        `http://localhost:8080/users/${this.user_id}/account/avatar/${avatar}`,
        null
      )
      .subscribe(
        (response) => {
          // Mettez à jour l'avatar dans votre composant Angular si nécessaire
          this.user.avatar = avatar;
          // Mettez à jour l'avatar dans votre composant Angular si nécessaire
          this.accountService.getUserData(this.user_id);
          this.avatar = avatar;
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'avatar :", error);
        }
      );
  }


  selectAvatar(avatar: string) {
    this.putAvatar(avatar);
    this.isModalOpen = false;
  }

  closeAvatarModal() {
    this.isModalOpen = false; // Ferme la modale sans sélection
  }

  //pour formater la date

  formatDate(dateISO: string): string {
    const birthdayDate = new Date(dateISO);
    const jour = birthdayDate.getDate().toString().padStart(2, '0');
    const mois = (birthdayDate.getMonth() + 1).toString().padStart(2, '0');
    const annee = birthdayDate.getFullYear();
    return jour + '/' + mois + '/' + annee;
  }

  ngOnInit(): void {
    this.httpClient
      .get<any>(`http://localhost:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
        this.avatar = this.user.avatar;
        this.user.birthday = this.formatDate(this.user.birthday);
        console.log(this.user);

      });
  }

  saveSelectedColor(color: string) {


    this.httpClient
       .put<any>(
         `http://localhost:8080/users/${this.user_id}/account/color/${color}`,
         null
       )
       .subscribe(
         (response) => {
           // Mettez à jour l'avatar dans votre composant Angular si nécessaire
           this.user.color = color;
           // Mettez à jour l'avatar dans votre composant Angular si nécessaire
           this.accountService.getUserData(this.user_id);

         },
         (error) => {
           console.error("Erreur lors de la mise à jour de l'avatar :", error);
         }
       );
  }

  dispoMP(){

    this.httpClient
       .put<any>(
         `http://localhost:8080/users/${this.user_id}/account/dispo/${!this.user.is_available}`,
         null
       )
       .subscribe(
         (response) => {
           // Mettez à jour l'avatar dans votre composant Angular si nécessaire
           this.accountService.getUserData(this.user_id);

         },
         (error) => {
           console.error("Erreur lors de la mise à jour de l'avatar :", error);
         }
       );
  }


  logout() {
    this.authService.logout();
  }
}
