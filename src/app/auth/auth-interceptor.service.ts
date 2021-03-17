// this interceptor injects auth token to outgoing requests

import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthServiceService } from './auth-service.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(private authService: AuthServiceService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // exhaustmap is used to replace the user observable with the inner observable
      take(1),
      exhaustMap(user => {
        
        if(!user) {
          return next.handle(req);
        }
        else {
          const modifiedRequest = req.clone({
            params: new HttpParams().set('auth', user.token)
          })
          return next.handle(modifiedRequest);
        }
        
      })
    )
    
  }
}
