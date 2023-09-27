import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private accountService : AccountServiceService, private http : HttpClient, private messageService : MessageService) { }

  globalChat = this.messageService.globalChat;
  mainChat = this.messageService.mainChat;
  privateChat = this.messageService.privateChat;
  infoMpChat : any = [];
  sidebarOpen: boolean = false;


  changeChat(){
    this.globalChat = this.messageService.globalChat;
    this.mainChat = this.messageService.mainChat;
    this.privateChat = this.messageService.privateChat;
  }


  ngOnInit(): void {
    setInterval(() => {
      this.changeChat();
    }, 100);
  }

  openSidebar() {
    this.sidebarOpen = true;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }





 }



