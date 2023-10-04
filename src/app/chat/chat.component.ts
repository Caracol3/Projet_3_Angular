import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { TokenValidationService } from '../token-validation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private accountService : AccountServiceService, private http : HttpClient, private messageService : MessageService, private router : Router, private tokenValidationService : TokenValidationService) { }

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
    if(!this.tokenValidationService.isTokenValid()){
      this.router.navigate(['/login']);
    }
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

  navigateToTrainInfo() {
    this.router.navigate(['/train-info']);
  }



 }



