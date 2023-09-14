import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http : HttpClient) { }

  sendMessage(username: string, message: string): Observable<any> {
    const url = `${this.apiUrl}/send-message`;
    const data = { username, message };
    return this.http.post(url, data);
  }

  // Exemple de méthode pour enregistrer un nouvel utilisateur
  registerUser(username: string): Observable<any> {
    const url = `${this.apiUrl}/addUser`;
    const data = { username };
    return this.http.post(url, data);
  }
}




