import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/session-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.token.getUser()
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'User': user ? user.split("-")[0] : "",
    });

    const authReq = req.clone({headers});

    return next.handle(authReq);
  }
}
export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
