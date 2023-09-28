import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-global',
  templateUrl: './chat-global.component.html',
  styleUrls: ['./chat-global.component.scss'],
})
export class ChatGlobalComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  message: string = '';
  messages: any[] = [];
  user_id: string | null = localStorage.getItem('userId');
  user: any = {};

  // Liste de 100 mots vulgaires à filtrer
  vulgarWords: string[] = ['merde', 'connard', 'connasse', 'salope', 'pute', 'enculé', 'pd', 'trou du cul', 'fdp', 'bitch'];

  constructor(
    private accountService: AccountServiceService,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    // ...
  }

  getMessages() {
    // ...
  }

  ngOnInit(): void {
    this.refreshMessages();
    this.http
      .get<any>(`http://localhost:8080/user/${this.user_id}`)
      .subscribe((data) => {
        this.user = data;
      });

    setInterval(() => {
      // this.scrollToBottom();
      this.refreshMessages();
    }, 500);
    
  }

  refreshMessages(): void {
    this.http
      .get<any>(`http://localhost:8080/all-messages-global`)
      .subscribe((data) => {
        this.messages = data;
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
        `http://localhost:8080/send-message-global/${this.user_id}`,
        infoMessage
      )
      .subscribe(
        (response) => {
          this.messages.push(response.data);
          setTimeout(() => {
            this.scrollToBottom();
          }, 100);
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'avatar :", error);
        }
      );
    this.message = '';
  }

  scrollToBottom(): void {
    try {
      const scrollHeight = this.chatContainer.nativeElement.scrollHeight;
      this.chatContainer.nativeElement.scrollTop = scrollHeight;
    } catch (err) {
      console.error(err);
    }
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
