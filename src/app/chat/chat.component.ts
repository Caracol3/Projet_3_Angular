import { AuthService } from './../service/AuthService';
import { Message } from 'src/interface/Message';
import { ChatService } from './chat.service';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../account-service.service';
import { User } from '../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public message=""
  public messages:Message[]=[]
  public userId=""
  public chatId=""
  public receverPseudo=""
  public senderPseudo=""
  constructor(private chatService: ChatService,private accountService: AccountServiceService, private authService:AuthService, private route: ActivatedRoute){}
ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap)=>{
    const id=params.get('id')
    if (id) {
      this.chatId=id


    }
  })
  this.chatService.getMessages(this.chatId).subscribe((messages)=>{
  this.messages=messages
  })
  let req=this.authService.getUserId()
if(req){
  this.userId=req
  this.accountService.getUser(parseInt(req)).subscribe((reponse)=>{
    this.senderPseudo=reponse.username

  })
  req=this.authService.getRecever()
  if (req) {
    this.receverPseudo=req

  }
}

}
sendMessage(text:string):void{
if (text.trim()==="") {
  return
  }
  this.chatService.sendMessage(this.userId,text,this.chatId).then(()=>{
   this.message=text
  })
}
}
