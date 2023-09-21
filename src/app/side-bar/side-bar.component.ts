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
  infoMainChat : any = [];
  listUser : any = [];
  userId : any = localStorage.getItem('userId');


  ngOnInit(): void {
    this.messageService.refreshMessagesMp();
    this.messageService.refreshMessagesMain();
    this.messageService.refreshMessagesGlobal();
    this.messageService.findUser();
    setTimeout(() => {
      this.infoMpChat = this.messageService.messagesMp;
      this.infoMainChat = this.messageService.messagesMain;
      this.listUser = this.messageService.allUsers;
    }, 500); 

  }

  isDuplicateMp(chatMp: any, currentIndex: number): boolean {
    for (let j = 0; j < currentIndex; j++) {
      const previousItem = this.infoMpChat[j];
      if (chatMp.user.id == previousItem.user.id) {
        return true;
      }
    }
    return false;
  }

  isDuplicateMain(roomName: string, currentIndex: number): boolean {
    for (let j = 0; j < currentIndex; j++) {
      const previousItem = this.infoMainChat[j];
      if (roomName === previousItem.roomName) {
        return true;
      }
    }
    return false;
  }


  selectUser(index : number){
    let userMp = {
      user : this.listUser[index].username,
      id : this.listUser[index].id
    }
    this.messageService.refreshMessagesMpByUser(userMp.id, this.userId, userMp);
  }


}
