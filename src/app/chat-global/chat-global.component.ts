import { Component, OnInit} from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-global',
  templateUrl: './chat-global.component.html',
  styleUrls: ['./chat-global.component.scss'],
})
export class ChatGlobalComponent implements OnInit {

  message: string = '';
  messages: any[] = [];
  user_id: string | null = localStorage.getItem('userId');
  user: any = {};

  // Liste de 100 mots vulgaires à filtrer
  vulgarWords: string[] = ['merde', 'connard', 'connasse', 'salope', 'pute', 'enculé', 'pd', 'trou du cul', 'fdp', 'bitch'];

  constructor(
    private accountService: AccountServiceService,
    private http: HttpClient,
    private dataService : DataService,
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

    }, 1000);

  }

  refreshMessages(): void {
    this.http
      .get<any>(`${this.dataService.serveUrl}/all-messages-global/0`)
      .subscribe((data) => {
        if (data != null){
        if (data.length > this.messages.length){
          this.messages = data;
        }}
        
      });
  }

  sendMessage(): void {
    // Effacer le champ de saisie après l'envoi du message
    let infoMessage = {
      message: this.filterMessage(this.message),
      date: new Date().toLocaleDateString(),
      heure: new Date().toLocaleTimeString(),
    };

    this.http
      .post<any>(
        `${this.dataService.serveUrl}/send-message-global/${this.user_id}`,
        infoMessage
      )
      .subscribe(
        (response) => {
          this.messages.push(response.data);
          setTimeout(() => {
          }, 100);
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

  filterMessage(message: string): string {
    // Remplacer les mots vulgaires par des étoiles
    for (const vulgarWord of this.vulgarWords) {
      const stars = '*'.repeat(vulgarWord.length);
      message = message.replace(new RegExp(vulgarWord, 'gi'), stars);
    }
    return message;
  }


}
