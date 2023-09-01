import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenKey = "";

  constructor() {}

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
