import { Component } from '@angular/core';
import { ContactEmailService,  } from '../contactEmailService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form: any = {};

  constructor(private contactEmailService: ContactEmailService) { }

  onSubmit(form:any) {
    if (this.form.title && this.form.email && this.form.message) {
      const emailData = {
        subject: this.form.title,
        body: this.form.message,
        email: this.form.email
      };

      this.contactEmailService.sendEmail(emailData).subscribe(
        response => {
          console.log('Email envoyé avec succès!', response);
        },
        error => {
          console.error("Erreur d'envoi du message:", error);
        }
      );
    } else {
      console.log('Veuillez remplir tous les champs requis.');
    }
  }
}

