import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from '../services/session-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private token: TokenStorageService,
    public authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.token.getUser();
    const token = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      User: user ? user.split('-')[1] : '',
    });

    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      catchError((errordata) => {
        if (errordata.status === 401) {
          return this.handleRefrehToken(authReq, next);
        }
        return throwError(errordata);
      })
    );
  }

  private handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.token.getRefreshToken();
    if (token)
      return this.authService.renewAccessToken(token).pipe(
        switchMap((data: any) => {
          this.token.saveToken(data.access_token, data.access_token_expires_at);
          this.refreshTokenSubject.next(data.access_token);

          return next.handle(this.addTokenHeader(request, data.access_token));
        }),
        catchError((err) => {
          this.token.signOut();
          return throwError(err);
        })
      );

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    const user = this.token.getUser();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      User: user ? user.split('-')[1] : '',
    });
    return request.clone({ headers });
  }
}
export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
