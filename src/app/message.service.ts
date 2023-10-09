import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient, private dataService : DataService) { }

  messagesGlobal: any[] = [];
  messagesMp: any[] = [];
  messagesMpByUser: any[] = [];
  messagesMainByRoom: any[] = [];
  messagesMain: any[] = [];
  allUsers: any[] = [];
  privateConv : any = {};
  globalChat : boolean = true;
  mainChat : boolean = false;
  privateChat : boolean = false;
  mainConv : string = "";



  changeChat(chat : string){
    if (chat == "global") {
      this.globalChat = true;
      this.mainChat = false;
      this.privateChat = false;
    }
    if (chat == "main") {
      this.mainChat = true;
      this.globalChat = false;
      this.privateChat = false;}
    if (chat == "private") {
      this.privateChat = true;
      this.globalChat = false;
      this.mainChat = false;}
    }



  refreshMessagesMp() {

     this.http
    .get<any>(`${this.dataService.serveUrl}/all-messages-mp`)
    .subscribe((data) => {
      this.messagesMp = data;
        });

    return this.messagesMp;
  }

  refreshMessagesMain() {

    this.http
   .get<any>(`${this.dataService.serveUrl}/all-messages-main`)
   .subscribe((data) => {
     this.messagesMain = data;
       });

   return this.messagesMain;

 }


 deleteRoom(url : string, numeroTrain : any){

 }



 refreshMessagesMainByRoom(roomName : string) {
  this.refreshMessagesMain();
  this.mainConv = roomName;
  this.messagesMainByRoom = [];
  for (let i = 0 ; i < this.messagesMain.length ; i++) {
    if (this.messagesMain[i].roomName == roomName) {
      this.messagesMainByRoom.push(this.messagesMain[i]);
    }
  }
  console.log(this.messagesMainByRoom);
  return this.messagesMainByRoom , this.mainConv;
}


  refreshMessagesMpByUser(userReceiver : number, userSender : any, info : any) {
    this.refreshMessagesMp();
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
   .get<any>(`${this.dataService.serveUrl}/all-messages-global/${this.messagesGlobal.length}`)
   .subscribe((data) => {
    
    this.messagesGlobal = data;
       });

   return this.messagesGlobal;
 }

  findUser() {
    this.http.get<any>(`${this.dataService.serveUrl}/admin/users`)
    .subscribe((data) => {
      this.allUsers = data;
        });

  }






}
