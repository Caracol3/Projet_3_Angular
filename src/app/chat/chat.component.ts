import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit  {

  message: string = '';
  messages: string[] = [];
  user_id: string | null = localStorage.getItem('userId');
  user: any = {};

  constructor(private accountService : AccountServiceService, private http : HttpClient) { }

 



  ngOnInit(): void {
    this.http
      .get<any>(`http://localhost:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
       
      });
  }


 sendMessage(): void {
  console.log('Message envoyé : ' + this.message + " " + this.user.username);
   this.messages.push(this.message);
    this.message = ''; // Effacer le champ de saisie après l'envoi du message
  }


 }
  


