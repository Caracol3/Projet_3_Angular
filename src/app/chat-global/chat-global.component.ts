import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-global',
  templateUrl: './chat-global.component.html',
  styleUrls: ['./chat-global.component.scss'],
})
export class ChatGlobalComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  message: string = '';

  messages: any[] = [];

  user_id: string | null = localStorage.getItem('userId');
  user: any = {};

  constructor(
    private accountService: AccountServiceService,
    private http: HttpClient
  ) {}

  getMessages() {
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
        this.messages = data;
      });
  }

  sendMessage(): void {
    // Effacer le champ de saisie après l'envoi du message

    let infoMessage = {
      message: this.message,
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
          // Ajoute un délai léger avant de faire défiler vers le haut
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
      // Obtenez la hauteur totale de l'élément déroulant
      const scrollHeight = this.chatContainer.nativeElement.scrollHeight;

      // Définissez scrollTop sur la hauteur totale pour faire défiler vers le bas
      this.chatContainer.nativeElement.scrollTop = scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

}
