

import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chat } from 'src/interface/Chat';
import { Message } from 'src/interface/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private database:AngularFirestore) { }
  //creer une nouvelle conversation
  createChat(participants:string[]){
    return this.database.collection("chats").add(
      {
        participants:participants
      }
    )

  }
  //obtenir les conversations d'un utilisateur
  getChats(userId:string):any[]{
    const chats:any[]=[]
    this.database.collection("chats",ref=>ref.where("participants","array-contains",userId)).snapshotChanges().subscribe((reponse)=>{
      reponse.map((el)=>{
        chats.push({
          id:el.payload.doc.id,
          data:el.payload.doc.data()
        })
      })
    })
    return chats
  }

  sendMessage(userId:string,message:string,chatId:string){
    return this.database.collection(`chats/${chatId}/messages`).add(
     {
      userId,
      message,
      dateTime:new Date(),
     }
    )
  }
  getMessages(chatId:string):Observable<Message[]>{
    return this.database.collection<Message>(`chats/${chatId}/messages`,ref=>ref.orderBy("dateTime")).valueChanges()


  }
}
