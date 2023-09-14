import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  


  constructor(private http: HttpClient) { }

userId: number = 0;


  async getUserData(id: number) {
    try {
      // Utilisez "await" pour attendre une opération asynchrone, par exemple une requête HTTP
      const resultat = await this.http.get('http://localhost:8080/user/' + id);
      this.userId = id;

    } catch (erreur) {
      console.error("log de l'erreur dans account-service" + erreur);
    }
  }

}
