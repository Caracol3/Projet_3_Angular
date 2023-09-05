import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../service/AuthService';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(      // intercepte les requêtes HTTP sortantes et ajoute le token JWT dans le header Authorization
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) { // si le token existe, on le passe dans le header de la requête
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,         // on ajoute le token dans le header de la requête  
        },
      });
return next.handle(cloned);
    } else {    // sinon on laisse passer la requête telle quelle
      return next.handle(req);
    }
    }
  }

