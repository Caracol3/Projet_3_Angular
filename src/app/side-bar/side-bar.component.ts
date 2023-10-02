import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{ MessageService } from '../message.service';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

@Input() sidebarOpen: boolean = false;
@Output() closeSidebarEvent = new EventEmitter<void>();

  constructor( private messageService : MessageService, private account : AccountServiceService) { }

  infoMpChat : any = [];
  infoMainChat : any = [];
  listUser : any = [];
  userId : any = localStorage.getItem('userId');
  myUser : any ;
  isSidebarOpen : boolean = false;
  userRoom : any = [];
  




  ngOnInit(): void {
    this.messageService.refreshMessagesMp();
    this.messageService.refreshMessagesMain();
    this.messageService.refreshMessagesGlobal();
    this.messageService.findUser();
    this.account.getUserData(this.userId);
    
    setTimeout(() => {
      this.infoMpChat = this.messageService.messagesMp;
      this.infoMainChat = this.messageService.messagesMain;
      this.listUser = this.messageService.allUsers;
      this.myUser = this.account.userInfos;
      this.myRoom();


    }, 500);
  }


  myRoom() {
    this.userRoom = [];
    const nomsDeSalleUniques = new Set<string>();
  
    for (let i = 0; i < this.infoMainChat.length; i++) {
      const chatMain = this.infoMainChat[i];
  
      // Vérifie si l'ID de l'utilisateur correspond à userId et si le roomName n'a pas déjà été ajouté
      if (chatMain.user.id == this.userId && !nomsDeSalleUniques.has(chatMain.roomName)) {
        this.userRoom.push(chatMain.roomName);
        nomsDeSalleUniques.add(chatMain.roomName);
      }
    }
    return this.userRoom;
  }


  changeChat(chat : string){
    this.messageService.changeChat(chat);
  }


// Émet l'événement pour demander la fermeture de la sidebar
requestCloseSidebar() {
  this.closeSidebarEvent.emit();
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
    const previousRooms = this.infoMainChat.slice(0, currentIndex);
    return previousRooms.some((room: { roomName: string; }) => room.roomName === roomName);
  }


  selectMain(index : number){
    let room = this.userRoom[index];
    this.messageService.refreshMessagesMainByRoom(room);
  }


  selectUserFalse(){
    window.alert("User non disponible en MP")
  }


  selectUser(index : number){

    let userMp = {
      user : this.listUser[index].username,
      id : this.listUser[index].id
    }

      this.messageService.refreshMessagesMpByUser(userMp.id, this.userId, userMp);
  }

  closeSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen)
  }

}

