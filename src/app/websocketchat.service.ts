import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketchatService {
  

  constructor(private socket: WebSocket) { }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:3030'); // Remplacez par l'URL de votre serveur WebSocket
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  receiveMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.addEventListener('message', (event) => {
        observer.next(event.data);
      });
    });
  }
  
}
