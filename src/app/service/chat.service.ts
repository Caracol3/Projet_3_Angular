import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client = new Client();
  private _incomingMessages = new BehaviorSubject<any[]>([]);

  public incomingMessages$: Observable<any[]> = this._incomingMessages.asObservable();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    this.stompClient = Stomp.over(() => {
      return new SockJS('http://localhost:8080/ws'); // Votre URL de serveur WebSocket ici
    });

    const _this = this;
    this.stompClient.onConnect = function(frame) {
      _this.stompClient.subscribe('/topic/public', (message: IMessage) => {
        if(message.body) {
          _this._incomingMessages.next([..._this._incomingMessages.getValue(), JSON.parse(message.body)]);
        }
      });
    };

    this.stompClient.activate();
  }

  sendMessage(destination: string, body: any) {
    if (this.stompClient.connected) {
      this.stompClient.publish({ destination: `/app/${destination}`, body: JSON.stringify(body) });
    }
  }

  public connect(): void {
    this.stompClient.activate();
  }

  public disconnect() {
    this.stompClient.deactivate();
  }
}
