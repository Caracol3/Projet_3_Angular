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
  avatarOptions: string[] = [
    '/assets/avatar/AvatarF1.png',
    '/assets/avatar/AvatarF2.png',
    '/assets/avatar/AvatarF3.png',
    '/assets/avatar/AvatarF4.png',
    '/assets/avatar/AvatarF5.png',
    '/assets/avatar/AvatarF6.png',
    '/assets/avatar/AvatarF7.png',
    '/assets/avatar/AvatarF8.png',
    '/assets/avatar/AvatarF9.png',
    '/assets/avatar/AvatarF10.png',
    '/assets/avatar/AvatarF11.png',
    '/assets/avatar/AvatarF12.png',
    '/assets/avatar/AvatarF13.png',
    '/assets/avatar/AvatarF14.png',
    '/assets/avatar/AvatarF15.png',
    '/assets/avatar/AvatarH1.png',
    '/assets/avatar/AvatarH2.png',
    '/assets/avatar/AvatarH3.png',
    '/assets/avatar/AvatarH4.png',
    '/assets/avatar/AvatarH5.png',
    '/assets/avatar/AvatarH6.png',
    '/assets/avatar/AvatarH7.png',
    '/assets/avatar/AvatarH8.png',
    '/assets/avatar/AvatarH9.png',
    '/assets/avatar/AvatarH10.png',
    '/assets/avatar/AvatarH11.png',
    '/assets/avatar/AvatarH12.png',
    '/assets/avatar/AvatarH13.png',
    '/assets/avatar/AvatarH14.png',
    '/assets/avatar/AvatarH15.png',
    '/assets/avatar/AvatarH16.png',
    '/assets/avatar/AvatarH17.png',
    '/assets/avatar/AvatarH18.png',
  ];
  user: any = {};

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountServiceService,
    private authService: AuthService
  ) {}

  openAvatarModal() {
    this.isModalOpen = true;
  }

  selectAvatar(avatar: string) {
    this.user.avatar = avatar; // Met à jour l'avatar de l'utilisateur
    this.isModalOpen = false; // Ferme la modale
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
        console.log(this.user);
        console.log('avatar :' + this.user.avatar);
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
