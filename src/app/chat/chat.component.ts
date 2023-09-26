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

  globalChat : boolean = true;
  mainChat : boolean = false;
  privateChat : boolean = false;
  infoMpChat : any = [];
  sidebarOpen: boolean = false;


  ngOnInit(): void {
    // this.messageService.refreshMessages();
    // this.infoMpChat = this.messageService.messages;
  }

  openSidebar() {
    this.sidebarOpen = true;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  changeChat(chat : string){
    console.log(chat);
  }




 }



