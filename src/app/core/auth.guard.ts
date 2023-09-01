import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterState, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

class UserGuard {
  constructor(private router: Router) { }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      console.log("UserGuard appelée : route protégée");
    // if(isLoggedIn){
    //   return true;
    // }
    this.router.navigate(['/login']);
    return false;
    // }
  }
}

export const IsUserGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(UserGuard).canActivate(route, state);
};

