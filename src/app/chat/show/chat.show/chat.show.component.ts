import { AuthService } from './../../../service/AuthService';
import { Chat } from './../../../../interface/Chat';

import { ChatService } from './../../chat.service';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/account-service.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat.show',
  templateUrl: './chat.show.component.html',
  styleUrls: ['./chat.show.component.scss']
})
export class ChatShowComponent implements OnInit{
  public userId:string=""
  public conversations:any[]=[]
  public receverId:string=""
  public users:User[]=[]
  public chatId=""
  constructor(private chatService:ChatService,private authService:AuthService, private accountService:AccountServiceService, private router:Router){


  }
  ngOnInit(): void {
    const req=this.authService.getUserId()
    if(req){
      this.userId=req
      this.loadChats()
    }

  }
  loadUsers(){
this.accountService.getUsers().subscribe((users)=>{
  this.users=users
})
  }
  loadChats(){
    this.conversations=this.chatService.getChats(this.userId)
    // this.chatService.getChats(this.userId).subscribe((chats)=>{
    //   this.conversations=chats
    //   console.log(chats)
    // })
  }
validateChat(recever:number){
  let valid=false
  if (this.conversations.length>0) {
this.conversations.map((conversation)=>{
  const participants:string[]=conversation.data.participants

  const index1=participants.indexOf(recever.toString())
  const index2=participants.indexOf(this.userId)


  if (index1 !==-1 && index2!==-1) {
    valid=true
this.chatId=conversation.id
  }

})

  }
  return valid
}
  newChat(recever:number){
    this.accountService.getUser(recever).subscribe((reponse)=>{
      console.log(reponse)
      localStorage.setItem("receverPseudo",reponse.username)
    })
    if (this.validateChat(recever)) {
      this.router.navigate(['/chat',this.chatId])
    } else {
      this.chatService.createChat([this.userId,recever.toString()]).then((response)=>{
        this.router.navigate(['/chat',response.id])

      })

    }

  }

}
