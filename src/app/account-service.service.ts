import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http: HttpClient) { }

userId = localStorage.getItem('userId');
userInfos : any;

   getUserData(userId : any) {
    this.http
      .get<any>(`http://localhost:8080/user/${userId}`)
      .subscribe((data: any) => {
        this.userInfos = data;
      });
  }

  // updateUserAvatar(id: number, avatar: string) {
  //   return this.http.put(`http://localhost:8080/user/${id}`, { avatar });
  // }
}
