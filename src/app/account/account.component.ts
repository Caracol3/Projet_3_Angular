import { Component, OnInit } from '@angular/core';
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
    '#FFA500',
    '#FF6B81',
    '#FF5733',
    '#9B59B6',
    '#3498DB',
    '#2ECC71',
    '#6D6D6D',
  ];
  selectedColor: string = 'red';
  pseudo: string = 'Pseudo';
  user_id: string | null = localStorage.getItem('userId');
  is_available: boolean = true;
  isModalOpen: boolean = false;
  routeAvatar: string = 'assets/avatar/';
  user: any = {};
  avatar : string = 'AvatarF1.png';
  avatarOptions: string[] = [
    'AvatarF1.png',
    'AvatarF2.png',
    'AvatarF3.png',
    'AvatarF4.png',
    'AvatarF5.png',
    'AvatarF6.png',
    'AvatarF7.png',
    'AvatarF8.png',
    'AvatarF9.png',
    'AvatarF10.png',
    'AvatarF11.png',
    'AvatarF12.png',
    'AvatarF13.png',
    'AvatarF14.png',
    'AvatarF15.png',
    'AvatarH1.png',
    'AvatarH2.png',
    'AvatarH3.png',
    'AvatarH4.png',
    'AvatarH5.png',
    'AvatarH6.png',
    'AvatarH7.png',
    'AvatarH8.png',
    'AvatarH9.png',
    'AvatarH10.png',
    'AvatarH11.png',
    'AvatarH12.png',
    'AvatarH13.png',
    'AvatarH14.png',
    'AvatarH15.png',
    'AvatarH16.png',
    'AvatarH17.png',
    'AvatarH18.png',
  ];
  

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountServiceService,
    private authService: AuthService
  ) {}

  openAvatarModal() {
    this.isModalOpen = true;
  }

  putAvatar(avatar: string) {
    return this.httpClient.put<any>(
      `http://localhost:8080/users/${this.user_id}/account/avatar/${avatar}`,
      null
    );

    // const body = {
    //   avatar: avatar,
    // };

    // this.httpClient
    //   .put<any>(
    //     `http://localhost:8080/users/${this.user_id}/account/avatar/`,
    //     body
    //   )
    //   .subscribe(
    //     (response) => {
    //       console.log('Avatar mis à jour avec succès :', response);
    //       // Mettez à jour l'avatar dans votre composant Angular si nécessaire
    //       this.user.avatar = avatar;
    //     },
    //     (error) => {
    //       console.error("Erreur lors de la mise à jour de l'avatar :", error);
    //     }
    //   );
  }

  selectAvatar(avatar: string) {
    console.log(avatar);
    this.putAvatar(avatar);
    this.isModalOpen = false;
    this.avatar = avatar;
    console.log(this.avatar);
    //  Ferme la modale

    //   this.accountService.updateUserAvatar(this.user.id, avatar).subscribe(
    //     (response) => {
    //       console.log('Avatar mis à jour avec succès :', response);
    //     },
    //     (error) => {
    //       console.error('Erreur lors de la mise à jour de l\'avatar :', error);
    //     }
    //   );
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
    console.log(this.accountService.userId);
    this.httpClient
      .get<any>(`http://localhost:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
        this.user.birthday = this.formatDate(this.user.birthday);
       
      });
  }

  saveSelectedColor(color: string) {
    console.log(this.user.color);
    this.user.color = color;
  }
  logout() {
    this.authService.logout();
  }
}
