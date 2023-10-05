import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {


  constructor(private http: HttpClient, private dataService : DataService) { }

  sendEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.dataService.serveUrl}/send-email`, data);
  }
}

