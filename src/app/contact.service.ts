import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(message: string) {
    return this.http.post(this.apiUrl, { message });
  }
}
