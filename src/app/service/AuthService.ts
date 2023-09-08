import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenKey: string = 'token';

login(token:string){
  localStorage.setItem(this.tokenKey,token);  //stockage du token dans le local storage
}

getToken():string | null{
  return localStorage.getItem(this.tokenKey); //récupération du token dans le local storage
}

logout(){
  localStorage.removeItem('userId');//suppression de l'id dans le local storage lors de la déconnexion
  localStorage.removeItem(this.tokenKey); //suppression du token dans le local storage lors de la déconnexion
}
}
