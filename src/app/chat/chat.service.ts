
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from 'src/interface/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private database:AngularFirestore) { }
  sendMessage(userId:string,message:string){
    return this.database.collection("message").add(
     {
      userId,
      message,
      dateTime:new Date(),
     }
    )
  }
  getMessages():Observable<Message[]>{
    return this.database.collection<Message>("message",ref=>ref.orderBy("dateTime")).valueChanges()


  }
}
