import { Message } from 'src/interface/Message';
import { ChatService } from './chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messageA=""
  public messageB=""
  public messages:Message[]=[]
  constructor(private chatService: ChatService){}
ngOnInit(): void {
  this.chatService.getMessages().subscribe((messages)=>{
  this.messages=messages
  })

}
sendMessage(userId:string,text:string):void{
if (text.trim()==="") {
  return
  }
  this.chatService.sendMessage(userId,text).then(()=>{
    if (userId==="user1") {
  this.messageA=text
    }
    else if(userId==="user2"){
      this.messageB=text
    }
  })
}
}
