import { Component, OnInit } from '@angular/core';
import { User_info } from '../models/user_info';
import { HttpClient } from '@angular/common/http';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  colorOptions: string[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    'white',
  ];
  selectedColor: string = 'red';
  pseudo: string = 'Pseudo';
  user_id: string | null = localStorage.getItem('userId');
  is_available: boolean = true;
  avatarOptions: string[] = [
    'avatar/AvatarF1.png',
    'avatar/AvatarF2.png',
    'avatar/AvatarF3.png',
    'avatar/AvatarF4.png',
    'avatar/AvatarF5.png',
    'avatar/AvatarF6.png',
    'avatar/AvatarF7.png',
    'avatar/AvatarF8.png',
    'avatar/AvatarF9.png',
    'avatar/AvatarF10.png',
    'avatar/AvatarF11.png',
    'avatar/AvatarF12.png',
    'avatar/AvatarF13.png',
    'avatar/AvatarF14.png',
    'avatar/AvatarF15.png',
    'avatar/AvatarH1.png',
    'avatar/AvatarH2.png',
    'avatar/AvatarH3.png',
    'avatar/AvatarH4.png',
    'avatar/AvatarH5.png',
    'avatar/AvatarH6.png',
    'avatar/AvatarH7.png',
    'avatar/AvatarH8.png',
    'avatar/Avatar9.png',
    'avatar/AvatarH10.png',
    'avatar/AvatarH11.png',
    'avatar/AvatarH12.png',
    'avatar/AvatarH13.png',
    'avatar/AvatarH14.png',
    'avatar/AvatarH15.png',
    'avatar/AvatarH16.png',
    'avatar/AvatarH17.png',
    'avatar/AvatarH18.png',
  ];
  user: any = {} ;

  constructor(private httpClient: HttpClient, private accountService : AccountServiceService) {}

  ngOnInit(): void {
    console.log(this.accountService.userId);
    this.httpClient.get<any>(`http://localhost:8080/user/${this.user_id}`)
    .subscribe(data => {
      this.user = data;
      console.log(this.user);
      
    });
    

  }

  saveSelectedColor() {
    console.log(this.user.firstname);
  }
}
