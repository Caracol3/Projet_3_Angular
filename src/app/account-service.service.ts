import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  // user: any;

  constructor(private http: HttpClient) { }

  //  getUserData(id: number) {
  //   this.http.get('http://localhost:8080/user/' + id).subscribe((response) => {
  //     console.log(response);
  //     this.user = response;
  //   })
  // }


  async getUserData(id: number) {
    try {
      // Utilisez "await" pour attendre une opération asynchrone, par exemple une requête HTTP
      const resultat = await this.http.get('http://localhost:8080/user/' + id);
      console.log("log de la const resultat dans account service : "+ resultat);
      // this.user = resultat;

    } catch (erreur) {
      console.error("log de l'erreur dans account-service" + erreur);
    }
  }

}
