import { Component } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  userMessage: string = '';

  constructor(private contactService: ContactService) {}

  sendEmail() {
    this.contactService.sendEmail(this.userMessage).subscribe(
      () => {
        console.log('Email envoyé avec succès');
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email', error);
      }
    );
  }

}
