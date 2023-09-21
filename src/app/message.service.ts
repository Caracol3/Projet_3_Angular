import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }

  messagesGlobal: any[] = [];
  messagesMp: any[] = [];
  messagesMpByUser: any[] = [];
  messagesMain: any[] = [];
  allUsers: any[] = [];
  privateConv : any = {};


  refreshMessagesMp() {

     this.http
    .get<any>(`http://192.168.1.51:8080/all-messages-mp`)
    .subscribe((data) => {
      this.messagesMp = data;
        });

    return this.messagesMp;
  }

  refreshMessagesMain() {

    this.http
   .get<any>(`http://192.168.1.51:8080/all-messages-main`)
   .subscribe((data) => {
     this.messagesMain = data;
       });

   return this.messagesMain;
 }


  refreshMessagesMpByUser(userReceiver : number, userSender : number, info : any) {
    this.privateConv = info;
    
    this.messagesMpByUser = [];
    for (let i = 0 ; i < this.messagesMp.length ; i++) {
      

      if (this.messagesMp[i].userReceiver == userReceiver && this.messagesMp[i].user.id == userSender || this.messagesMp[i].userReceiver == userSender && this.messagesMp[i].user.id == userReceiver) {
        this.messagesMpByUser.push(this.messagesMp[i]);
      }

    }
    
    
   return this.messagesMpByUser , this.privateConv;
  }

  refreshMessagesGlobal() {

    this.http
   .get<any>(`http://192.168.1.51:8080/all-messages-global`)
   .subscribe((data) => {
     this.messagesGlobal = data;
       });

   return this.messagesGlobal;
 }

  findUser() {
    this.http.get<any>(`http://192.168.1.51:8080/admin/users`)
    .subscribe((data) => {
      this.allUsers = data;
        });

  }






}
