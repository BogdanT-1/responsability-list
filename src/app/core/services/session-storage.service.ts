import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';
const EXPIRATION = 'expiration'
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string, validityDuration: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(`${TOKEN_KEY}-${EXPIRATION}`);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(`${TOKEN_KEY}-${EXPIRATION}`, validityDuration);
  }

  public saveRefreshToken(token: string, validityDuration: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.removeItem(`${REFRESH_TOKEN_KEY}-${EXPIRATION}`);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    window.sessionStorage.setItem(`${REFRESH_TOKEN_KEY}-${EXPIRATION}`, validityDuration);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
