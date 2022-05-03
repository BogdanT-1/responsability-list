import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyTask } from '../../modules/shared/models-constants/dailytask.model';
import { TokenStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendDefaultRoute: string = "http://localhost:9010/";
  headers = { 'content-type': 'application/json'} ;
  authenticated = false;
  constructor(
  private http: HttpClient,
  private _tokenService: TokenStorageService
  ) { }

  createUser(user: any) {
    const userUrl = "createUser/";
    const body = JSON.stringify(user);
    return this.http.post(this.backendDefaultRoute + userUrl, body, {'headers': this.headers});
  }

  loginUser(user: any) {
    const userUrl = "loginUser/";
    const body = JSON.stringify(user);
    return this.http.post(this.backendDefaultRoute + userUrl, body, {'headers': this.headers});
  }

  setUserAsLoggedInOut(status: boolean) {
    this.authenticated = status;
    if (!this.authenticated) {
      this._tokenService.signOut();
    }
  }

  isUserLoggedIn() {
    return this.authenticated || !!this._tokenService.getUser();
  }
}
