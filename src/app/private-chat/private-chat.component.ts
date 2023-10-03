import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {

  @ViewChild('maDiv') maDiv?: ElementRef;

  message: string = '';
  messages: any[] = [];
  user_id: string | null = localStorage.getItem('userId');
  user: any = {};
  privateConv: any = {};


  constructor(
    private accountService: AccountServiceService,
    private http: HttpClient,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.refreshMessages();
    this.http
      .get<any>(`${this.dataService.serveUrl}/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
      });
    setInterval(() => {
      this.refreshMessages();
    }, 250);
  }

  refreshMessages(): void {
    this.messages = this.messageService.messagesMpByUser;
    this.privateConv = this.messageService.privateConv;
    this.messageService.refreshMessagesMpByUser(
      this.privateConv.id,
      this.user_id,
      this.privateConv
    );
  }

  sendMessage(): void {
    // Effacer le champ de saisie après l'envoi du message
    let infoMessage = {
      message: this.message,
      heure: new Date().toLocaleTimeString(),
      userReceiver: this.privateConv.id,
      userReceiverName: this.privateConv.user,
    };
    this.http
      .post<any>(
        `${this.dataService.serveUrl}/send-message-mp/${this.user_id}`,
        infoMessage
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

  formatTime(timeString: string): string {
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  }
}
