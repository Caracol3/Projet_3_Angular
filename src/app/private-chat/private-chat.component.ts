import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  message: string = '';

  messages: any[] = [];
  userReveicer: Number = 7;
  userReveicerName: string = 'Omar';
  user_id: string | null = localStorage.getItem('userId');
  user: any = {};
  privateConv : any = {};


  constructor(private accountService : AccountServiceService, private http : HttpClient, private messageService : MessageService) { }





  



  ngOnInit(): void {
    this.refreshMessages();
    this.http
      .get<any>(`http://192.168.1.51:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;

        
       
      });

      setInterval(() => {
        this.refreshMessages();
      }, 500);  



  }


    refreshMessages(): void {

     this.messages = this.messageService.messagesMpByUser
      this.privateConv = this.messageService.privateConv;
    
       
      }

    


     




 sendMessage(): void {

   
     // Effacer le champ de saisie après l'envoi du message

    let infoMessage = {
      message: this.message,
      heure : new Date().toLocaleTimeString(),
      userReceiver : this.privateConv.id,
      userReceiverName : this.privateConv.user,
    }


    this.http
    .post<any>(
      `http://192.168.1.51:8080/send-message-mp/${this.user_id}`,
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
