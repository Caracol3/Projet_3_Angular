import { Component } from '@angular/core';
import { ChatService } from '../service/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  username: string = ''; // Variable pour stocker le nom d'utilisateur saisi
  messages: string[] = []; // Variable pour stocker les messages
  newMessage: string = ''; // Variable pour stocker le nouveau message saisi

  constructor(private chatService: ChatService) { }

  // Fonction pour soumettre le formulaire du nom d'utilisateur
  onSubmitUsername() {
    // Assurez-vous que le nom d'utilisateur n'est pas vide
    if (this.username.trim() !== '') {
      // Vous pouvez implémenter la logique pour envoyer le nom d'utilisateur au serveur ici
      // Par exemple, utiliser un service Angular pour envoyer le nom d'utilisateur au serveur Spring
      console.log('Nom d\'utilisateur saisi :', this.username);
    }
  }

  // Fonction pour soumettre le formulaire de message
  onSubmitMessage() {
    // Assurez-vous que le message n'est pas vide
    if (this.newMessage.trim() !== '') {
      // Envoyer le message au serveur Spring en utilisant le service
      this.chatService.sendMessage(this.username,this.newMessage)
        .subscribe((response) => {
          console.log('Message envoyé avec succès au serveur Spring:', response);
        }, (error) => {
          console.error('Erreur lors de l\'envoi du message au serveur Spring:', error);
        });

      // Ajouter le message à la liste des messages
      this.messages.push(`${this.username}: ${this.newMessage}`);

      // Effacer le champ de saisie du message
      this.newMessage = '';
    }
  }
}
