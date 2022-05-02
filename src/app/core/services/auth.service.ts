import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyTask } from '../../modules/shared/models-constants/dailytask.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendDefaultRoute: string = "http://localhost:9010/";
  headers = { 'content-type': 'application/json'} ;
  constructor(private http: HttpClient) { }

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
}
