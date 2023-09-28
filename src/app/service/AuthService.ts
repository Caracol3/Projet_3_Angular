import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenKey: string = 'token';
  userId: string | null = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

login(token:string){
  localStorage.setItem(this.tokenKey,token);  //stockage du token dans le local storage
}

getToken():string | null{
  return localStorage.getItem(this.tokenKey); //récupération du token dans le local storage
}

logout(){
  this.disconnectUser();
  localStorage.removeItem('userId');//suppression de l'id dans le local storage lors de la déconnexion
  localStorage.removeItem(this.tokenKey); //suppression du token dans le local storage lors de la déconnexion
  
}

disconnectUser() {
  this.http
  .put<any>(
    `http://localhost:8080/users/${this.userId}/account/online/false`,
    null
  ).subscribe(
    (response) => {
      // Mettez à jour l'avatar dans votre composant Angular si nécessaire
      console.log("Déconnexion de l'user : "+ this.userId, response);
    
      
    },
    (error) => {
      console.error("Erreur lors de la mise à jour de l'user :", error);
    }
  );
}


}
