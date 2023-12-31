import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';




@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit {
  message: string = '';

  messages: any[] = [];
  roomname: string = this.messageService.mainConv;

  user_id: string | null = localStorage.getItem('userId');
  user: any = {};




  constructor(private accountService : AccountServiceService,private dataService : DataService, private http : HttpClient, private messageService : MessageService, private router : Router) { }
  


  ngOnInit(): void {
    this.refreshMessages();
    this.http
      .get<any>(`${this.dataService.serveUrl}/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
      });

      setInterval(() => {
        this.refreshMessages();
      }, 500);



  }

  infoTrain(){
    localStorage.setItem("urlRetard", this.messageService.mainConv);
    this.router.navigate(['/train-info']);

  }


    refreshMessages(): void {

      this.messages = this.messageService.messagesMainByRoom;
      this.roomname = this.messageService.mainConv;
      this.messageService.refreshMessagesMainByRoom(this.roomname);
    }

  sendMessage(): void {
    // Effacer le champ de saisie après l'envoi du message

    let infoMessage = {
      message: this.message,
      user_id: this.user_id,
      heure: new Date().toLocaleTimeString(),
      roomName: this.roomname,
    };

    this.http
    .post<any>(
      `${this.dataService.serveUrl}/send-message-main/${this.user_id}`,
      infoMessage,
    )
    .subscribe(
      (response) => {
        // this.messages.push(response.data);


      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'avatar :", error);
      }
    );

    this.message = '';
  }

  formatTime(timeString: string): string {
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  }

  navigateToTrainInfo() {
    this.router.navigate(['/train-info']);
  }
}

