import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { AuthService } from './service/AuthService';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {

  constructor(private authService : AuthService) { }

  isTokenValid(): boolean {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
      

        // Vérifiez si le token a expiré
        return expirationDate > new Date();
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return false;
      }
    }

    return false;
  }





}
