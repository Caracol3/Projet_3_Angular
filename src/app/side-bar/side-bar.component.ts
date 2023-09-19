import { Component, OnInit } from '@angular/core';
import{ MessageService } from '../message.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {



  constructor( private messageService : MessageService) { }

  infoMpChat : any = [];
  listUser : any = [];
  userId : any = localStorage.getItem('userId');


  ngOnInit(): void {
    this.messageService.refreshMessages();
    this.messageService.findUser();
    setTimeout(() => {
      this.infoMpChat = this.messageService.messages;
      this.listUser = this.messageService.allUsers;
    }, 500); 

  }






}
