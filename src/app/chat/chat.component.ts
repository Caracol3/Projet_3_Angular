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

  messages: any[] = [];

  user_id: string | null = localStorage.getItem('userId');
  user: any = {};


  constructor(private accountService : AccountServiceService, private http : HttpClient) { }


getMessages(){
  this.http
      .get<any>(`http://localhost:8080/all-messages`)
      .subscribe((data) => {
        this.messages = data;
      });

}




  



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
      .get<any>(`http://localhost:8080/all-messages-global`)
      .subscribe((data) => {
        console.log(data);
        this.messages = data;
       
      });

    }


     




 sendMessage(): void {

   
     // Effacer le champ de saisie après l'envoi du message

    let infoMessage = {
      message: this.message,
      date : new Date().toLocaleDateString(),
      heure : new Date().toLocaleTimeString(),
    }


    this.http
    .post<any>(
      `http://localhost:8080/send-message-global/${this.user_id}`,
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



