import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {

  message: string = '';

  messages: any[] = [];
  roomname: string = 'room de test';

  user_id: string | null = localStorage.getItem('userId');
  user: any = {};


  constructor(private accountService : AccountServiceService, private http : HttpClient) { }





  



  ngOnInit(): void {
    this.refreshMessages();
    this.http
      .get<any>(`http://localhost:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;

        
       
      });

      setInterval(() => {
        this.refreshMessages();
      }, 500000000000);  



  }


    refreshMessages(): void {

      this.http
      .get<any>(`http://localhost:8080/all-messages-main`)
      .subscribe((data) => {
        this.messages = data;
       
      });

    }


     




 sendMessage(): void {

   
     // Effacer le champ de saisie après l'envoi du message

    let infoMessage = {
      message: this.message,
      user_id: this.user_id,
      heure : new Date().toLocaleTimeString(),
      roomName : this.roomname,
    }


    this.http
    .post<any>(
      `http://localhost:8080/send-message-main/${this.user_id}`,
      infoMessage,
    )
    .subscribe(
      (response) => {
        this.messages.push(response.data);     
        
     
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'avatar :", error);
      }
    );


    this.message = '';
    




  }

}



