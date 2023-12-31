import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/AuthService';
@Injectable({
  providedIn: 'root',
})
class UserGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      const token = this.authService.getToken();

      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }

  export const IsUserGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean => {
    return inject(UserGuard).canActivate(route, state);
};
