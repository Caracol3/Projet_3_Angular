import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http: HttpClient, private dataService : DataService) { }

userId = localStorage.getItem('userId');
userInfos : any;


   getUserData(userId : any) {
    this.http
      .get<any>(`${this.dataService.serveUrl}/user/${userId}`)
      .subscribe((data: any) => {
        this.userInfos = data;
      });
  }

}
